import { useDialog } from '@/components/common/DialogProvider';
import type { ProjectEnvironmentVariableFormValues } from '@/components/settings/environmentVariables/ProjectEnvironmentVariableForm';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { useCurrentWorkspaceAndApplication } from '@/hooks/useCurrentWorkspaceAndApplication';
import type { EnvironmentVariable } from '@/types/application';
import ActivityIndicator from '@/ui/v2/ActivityIndicator';
import Button from '@/ui/v2/Button';
import Divider from '@/ui/v2/Divider';
import { Dropdown } from '@/ui/v2/Dropdown';
import IconButton from '@/ui/v2/IconButton';
import DotsVerticalIcon from '@/ui/v2/icons/DotsVerticalIcon';
import PlusIcon from '@/ui/v2/icons/PlusIcon';
import List from '@/ui/v2/List';
import { ListItem } from '@/ui/v2/ListItem';
import Text from '@/ui/v2/Text';
import { toastStyleProps } from '@/utils/settings/settingsConstants';
import {
  useDeleteEnvironmentVariableMutation,
  useGetEnvironmentVariablesQuery,
  useInsertEnvironmentVariablesMutation,
  useUpdateEnvironmentVariableMutation,
} from '@/utils/__generated__/graphql';
import { format } from 'date-fns';
import { Fragment } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export interface PermissionVariableSettingsFormValues {
  /**
   * Permission variables.
   */
  environmentVariables: EnvironmentVariable[];
}

export default function ProjectEnvironmentVariableSettings() {
  const { openDialog, openAlertDialog } = useDialog();
  const { currentApplication } = useCurrentWorkspaceAndApplication();
  const { data, loading, error } = useGetEnvironmentVariablesQuery({
    variables: {
      id: currentApplication?.id,
    },
  });

  const [insertEnvironmentVariables] = useInsertEnvironmentVariablesMutation({
    refetchQueries: ['getEnvironmentVariables'],
  });

  const [updateEnvironmentVariable] = useUpdateEnvironmentVariableMutation({
    refetchQueries: ['getEnvironmentVariables'],
  });

  const [deleteEnvironmentVariable] = useDeleteEnvironmentVariableMutation({
    refetchQueries: ['getEnvironmentVariables'],
  });

  if (loading) {
    return (
      <ActivityIndicator
        delay={1000}
        label="Loading environment variables..."
      />
    );
  }

  if (error) {
    throw error;
  }

  const availableEnvironmentVariables =
    [...data.environmentVariables].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ) || [];

  async function handleInsertVariable({
    name,
    prodValue,
    devValue,
  }: ProjectEnvironmentVariableFormValues) {
    const insertEnvironmentVariablePromise = insertEnvironmentVariables({
      variables: {
        environmentVariables: [
          { appId: currentApplication.id, name, prodValue, devValue },
        ],
      },
    });

    await toast.promise(
      insertEnvironmentVariablePromise,
      {
        loading: 'Creating environment variable...',
        success: 'Environment variable has been created successfully.',
        error: 'An error occurred while creating the environment variable.',
      },
      toastStyleProps,
    );
  }

  async function handleEditVariable({
    id,
    prodValue,
    devValue,
  }: ProjectEnvironmentVariableFormValues) {
    const updateEnvironmentVariablePromise = updateEnvironmentVariable({
      variables: {
        id,
        environmentVariable: {
          prodValue,
          devValue,
        },
      },
    });

    await toast.promise(
      updateEnvironmentVariablePromise,
      {
        loading: 'Updating environment variable...',
        success: 'Environment variable has been updated successfully.',
        error: 'An error occurred while updating the environment variable.',
      },
      toastStyleProps,
    );
  }

  async function handleDeleteVariable({ id }: EnvironmentVariable) {
    const deleteEnvironmentVariablePromise = deleteEnvironmentVariable({
      variables: {
        id,
      },
    });

    await toast.promise(
      deleteEnvironmentVariablePromise,
      {
        loading: 'Deleting environment variable...',
        success: 'Environment variable has been deleted successfully.',
        error: 'An error occurred while deleting the environment variable.',
      },
      toastStyleProps,
    );
  }

  function handleOpenCreator() {
    openDialog('MANAGE_ENVIRONMENT_VARIABLE', {
      title: (
        <span className="grid grid-flow-row">
          <span>Create Environment Variable</span>

          <Text variant="subtitle1" component="span">
            The default value will be available in all environments, unless you
            override it. All values are encrypted.
          </Text>
        </span>
      ),
      payload: {
        availableEnvironmentVariables,
        submitButtonText: 'Add',
        onSubmit: handleInsertVariable,
      },
      props: { PaperProps: { className: 'max-w-sm' } },
    });
  }

  function handleOpenEditor(originalVariable: EnvironmentVariable) {
    openDialog('MANAGE_ENVIRONMENT_VARIABLE', {
      title: (
        <span className="grid grid-flow-row">
          <span>Create Environment Variable</span>

          <Text variant="subtitle1" component="span">
            The default value will be available in all environments, unless you
            override it. All values are encrypted.
          </Text>
        </span>
      ),
      payload: {
        originalEnvironmentVariable: originalVariable,
        availableEnvironmentVariables,
        onSubmit: handleEditVariable,
      },
      props: { PaperProps: { className: 'max-w-sm' } },
    });
  }

  function handleConfirmDelete(originalVariable: EnvironmentVariable) {
    openAlertDialog({
      title: 'Delete Environment Variable',
      payload: (
        <Text>
          Are you sure you want to delete the &quot;
          <strong>{originalVariable.name}</strong>&quot; environment variable?
          This cannot be undone.
        </Text>
      ),
      props: {
        primaryButtonColor: 'error',
        primaryButtonText: 'Delete',
        onPrimaryAction: () => handleDeleteVariable(originalVariable),
      },
    });
  }

  return (
    <SettingsContainer
      title="Project Environment Variables"
      description="Environment Variables are key-value pairs configured outside your source code. They are used to store environment-specific values such as API keys."
      docsLink="https://docs.nhost.io/platform/environment-variables"
      docsTitle="Environment Variables"
      rootClassName="gap-0"
      className="px-0 my-2"
      slotProps={{ submitButton: { className: 'hidden' } }}
    >
      <div className="grid grid-cols-2 border-b-1 border-gray-200 px-4 py-3">
        <Text className="font-medium">Variable Name</Text>
        <Text className="font-medium">Updated</Text>
      </div>

      <div className="grid grid-flow-row gap-2">
        <List>
          {availableEnvironmentVariables.map((environmentVariable, index) => (
            <Fragment key={environmentVariable.id}>
              <ListItem.Root
                className="px-4 grid grid-cols-2"
                secondaryAction={
                  <Dropdown.Root>
                    <Dropdown.Trigger
                      asChild
                      hideChevron
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <IconButton variant="borderless" color="secondary">
                        <DotsVerticalIcon />
                      </IconButton>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                      menu
                      PaperProps={{ className: 'w-32' }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Dropdown.Item
                        onClick={() => handleOpenEditor(environmentVariable)}
                      >
                        <Text className="font-medium">Edit</Text>
                      </Dropdown.Item>

                      <Divider component="li" />

                      <Dropdown.Item
                        onClick={() => handleConfirmDelete(environmentVariable)}
                      >
                        <Text
                          className="font-medium"
                          sx={{
                            color: (theme) => theme.palette.error.main,
                          }}
                        >
                          Delete
                        </Text>
                      </Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown.Root>
                }
              >
                <ListItem.Text>{environmentVariable.name}</ListItem.Text>

                <Text className="font-medium">
                  {format(
                    new Date(environmentVariable.updatedAt),
                    'dd MMM yyyy',
                  )}
                </Text>
              </ListItem.Root>

              <Divider
                component="li"
                className={twMerge(
                  index === availableEnvironmentVariables.length - 1
                    ? '!mt-4'
                    : '!my-4',
                )}
              />
            </Fragment>
          ))}
        </List>

        <Button
          className="justify-self-start mx-4"
          variant="borderless"
          startIcon={<PlusIcon />}
          onClick={handleOpenCreator}
        >
          Create Environment Variable
        </Button>
      </div>
    </SettingsContainer>
  );
}
