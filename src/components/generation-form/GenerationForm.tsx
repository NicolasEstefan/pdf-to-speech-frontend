import DropzoneField from '../common/DropzoneField'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import FieldGroup from '../common/FieldGroup'
import { SelectField } from '../common/SelectField'
import { useCreateGenerationMutation, useGetOptionsQuery } from '../../store'
import { Skeleton, Paper, Stack, Title, Group, Button, ActionIcon } from '@mantine/core'
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

  const toggleSampleAudio = () => {
    if (sampleAudioRef.current) {
      if (isPlayingSampleAudio) {
        sampleAudioRef.current.pause()
      } else {
        sampleAudioRef.current.play()
      }
    }
  }

  useEffect(() => {
    if (!options) return
    setValue('language', options.languages[1])
    setValue('speaker', options.speakers[0])
  }, [options, setValue])

  useEffect(() => {
    if (!speaker || !language) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlayingSampleAudio(false)

    const audio = new Audio(`assets/audios/${language}/${speaker}.wav`)
    sampleAudioRef.current = audio

    const onPlay = () => setIsPlayingSampleAudio(true)
    const onPause = () => setIsPlayingSampleAudio(false)
    const onEnded = () => setIsPlayingSampleAudio(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [speaker, language])

  const submitHandler = async (fields: FormFields) => {
    await createGeneration(fields)
    reset()
  }

  const isFormDisabled = createGenerationResults.isLoading || isSubmitting

  return (
    <Paper radius="xl" withBorder shadow="md" p="xl" w={{ base: '100%', sm: 480 }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap="md">
          <Title order={2} mb="xs">
            {t('generation-form-heading')}
          </Title>

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
              <Skeleton height={42} radius="sm" />
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
              <Skeleton height={42} radius="sm" />
            ) : (
              <Group gap="sm" wrap="nowrap">
                <SelectField
                  flex={1}
                  {...register('speaker')}
                  options={options!.speakers.map((speaker) => ({
                    label: t(`speakers.${speaker}`),
                    value: speaker,
                  }))}
                />
                <ActionIcon onClick={toggleSampleAudio} type="button" size="xl" radius="xl">
                  {isPlayingSampleAudio ? (
                    <IconPlayerPause stroke={2} />
                  ) : (
                    <IconVolume stroke={2} />
                  )}
                </ActionIcon>
              </Group>
            )}
            {errors.speaker && <ErrorText>{errors.speaker.message}</ErrorText>}
          </FieldGroup>

          <Group justify="flex-end" mt="xs">
            <Button type="submit" disabled={isFormDisabled} radius="xl">
              {t('generate-audio')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
