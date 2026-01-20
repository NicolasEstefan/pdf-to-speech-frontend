import DropzoneField from '../common/DropzoneField'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import FieldGroup from '../common/FieldGroup'
import { SelectField } from '../common/SelectField'
import { useCreateGenerationMutation, useGetOptionsQuery } from '../../store'
import Skeleton from 'react-loading-skeleton'
import Button from '../common/Button'
import ErrorText from '../common/ErrorText'

const validationSchema = z
  .object({
    file: z.file('El PDF es requerido'),
    speaker: z.string().nonempty(),
    language: z.string().nonempty(),
  })
  .required()

type FormFields = z.infer<typeof validationSchema>

export default function GenerationForm() {
  const { isLoading: isLoadingOptions, data: options } = useGetOptionsQuery()
  const [createGeneration, createGenerationResults] = useCreateGenerationMutation()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
  })

  const submitHandler = async (fields: FormFields) => {
    await createGeneration(fields)
    reset()
  }

  const isFormDisabled = createGenerationResults.isLoading || isSubmitting

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 rounded-3xl border border-gray-300 bg-white p-6"
    >
      <h1 className="mb-4 text-2xl font-semibold">¡Convierte tu PDF en audio en minutos!</h1>
      <FieldGroup label="Archivo PDF">
        <Controller
          name="file"
          control={control}
          render={({ field }) => <DropzoneField {...field} />}
        />
        {errors.file && <ErrorText>{errors.file.message}</ErrorText>}
      </FieldGroup>
      <FieldGroup label="Idioma">
        {isLoadingOptions ? (
          <Skeleton width="100%" height={40} borderRadius={12} />
        ) : (
          <SelectField
            {...register('language')}
            options={options!.languages.map((language) => ({ label: language, value: language }))}
          />
        )}
        {errors.language && <ErrorText>{errors.language.message}</ErrorText>}
      </FieldGroup>
      <FieldGroup label="Voz">
        {isLoadingOptions ? (
          <Skeleton width="100%" height={40} borderRadius={12} />
        ) : (
          <SelectField
            {...register('speaker')}
            options={options!.speakers.map((speaker) => ({ label: speaker, value: speaker }))}
          />
        )}
        {errors.speaker && <ErrorText>{errors.speaker.message}</ErrorText>}
      </FieldGroup>
      <div className="flex justify-end">
        <Button disabled={isFormDisabled}>Generar audio</Button>
      </div>
    </form>
  )
}
