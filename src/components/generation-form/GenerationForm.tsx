import DropzoneField from '../common/DropzoneField'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import FieldGroup from '../common/FieldGroup'
import { SelectField } from '../common/SelectField'
import { useCreateGenerationMutation, useGetOptionsQuery } from '../../store'
import Skeleton from 'react-loading-skeleton'
import Button from '../common/Button'
import ErrorText from '../common/ErrorText'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IconPlayerPause, IconVolume } from '@tabler/icons-react'

export default function GenerationForm() {
  const { isLoading: isLoadingOptions, data: options } = useGetOptionsQuery()
  const sampleAudioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlayingSampleAudio, setIsPlayingSampleAudio] = useState(false)
  const [createGeneration, createGenerationResults] = useCreateGenerationMutation()
  const { t } = useTranslation()

  const validationSchema = useMemo(
    () =>
      z
        .object({
          file: z.file(t('pdf-is-required')),
          speaker: z.string().nonempty(),
          language: z.string().nonempty(),
        })
        .required(),
    [t]
  )

  type FormFields = z.infer<typeof validationSchema>

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
  })

  const speaker = useWatch({ control, name: 'speaker' })
  const language = useWatch({ control, name: 'language' })

  useEffect(() => {
    if (!options) {
      return
    }

    setValue('language', options.languages[0])
    setValue('speaker', options.speakers[0])
  }, [options, setValue])

  useEffect(() => {
    if (!speaker || !language) {
      return
    }

    sampleAudioRef.current = new Audio(`assets/audios/${language}/${speaker}.wav`)

    const onPlay = () => setIsPlayingSampleAudio(true)
    const onPause = () => setIsPlayingSampleAudio(false)
    const onEnded = () => setIsPlayingSampleAudio(false)

    sampleAudioRef.current.addEventListener('play', onPlay)
    sampleAudioRef.current.addEventListener('pause', onPause)
    sampleAudioRef.current.addEventListener('ended', onEnded)

    return () => {
      sampleAudioRef.current!.removeEventListener('play', onPlay)
      sampleAudioRef.current!.removeEventListener('pause', onPause)
      sampleAudioRef.current!.removeEventListener('ended', onEnded)
    }
  }, [speaker, language])

  const toggleSampleAudio = () => {
    if (sampleAudioRef.current) {
      if (isPlayingSampleAudio) {
        sampleAudioRef.current.pause()
      } else {
        sampleAudioRef.current.play()
      }
    }
  }

  const submitHandler = async (fields: FormFields) => {
    await createGeneration(fields)
    reset()
  }

  const isFormDisabled = createGenerationResults.isLoading || isSubmitting

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-300 flex-col gap-4 rounded-3xl border border-gray-300 bg-white p-6 shadow-md"
    >
      <h1 className="mb-4 text-2xl font-semibold">{t('generation-form-heading')}</h1>
      <FieldGroup label={t('pdf-file')}>
        <Controller
          name="file"
          control={control}
          render={({ field }) => <DropzoneField {...field} />}
        />
        {errors.file && <ErrorText>{errors.file.message}</ErrorText>}
      </FieldGroup>
      <FieldGroup label={t('language')}>
        {isLoadingOptions ? (
          <Skeleton width="100%" height={40} borderRadius={12} />
        ) : (
          <SelectField
            {...register('language')}
            options={options!.languages.map((language) => ({
              label: t(`languages.${language}`),
              value: language,
            }))}
          />
        )}
        {errors.language && <ErrorText>{errors.language.message}</ErrorText>}
      </FieldGroup>
      <FieldGroup label={t('voice')}>
        {isLoadingOptions ? (
          <Skeleton width="100%" height={40} borderRadius={12} />
        ) : (
          <div className="flex w-full items-center gap-4">
            <SelectField
              className="w-full"
              {...register('speaker')}
              options={options!.speakers.map((speaker) => ({
                label: t(`speakers.${speaker}`),
                value: speaker,
              }))}
            />
            <Button onClick={toggleSampleAudio} type="button" className="p-4">
              {isPlayingSampleAudio ? <IconPlayerPause stroke={2} /> : <IconVolume stroke={2} />}
            </Button>
          </div>
        )}
        {errors.speaker && <ErrorText>{errors.speaker.message}</ErrorText>}
      </FieldGroup>
      <div className="mt-2 flex justify-end">
        <Button disabled={isFormDisabled}>{t('generate-audio')}</Button>
      </div>
    </form>
  )
}
