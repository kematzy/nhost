// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  defaultSidebar: [
    'get-started/index',
    {
      label: 'Quick Start',
      type: 'category',
      collapsed: false,
      items: [
        'get-started/quick-start/index',
        'get-started/quick-start/schema',
        'get-started/quick-start/javascript-client',
        'get-started/quick-start/permissions'
      ]
    },
    {
      label: 'Authentication',
      type: 'category',
      items: ['get-started/authentication/index']
    },
    {
      label: 'CLI Workflow',
      type: 'category',
      items: [
        'get-started/cli-workflow/index',
        'get-started/cli-workflow/workflow-setup',
        'get-started/cli-workflow/install-cli',
        'get-started/cli-workflow/local-changes',
        'get-started/cli-workflow/metadata-and-serverless-functions'
      ]
    },
    {
      label: 'Upgrade',
      type: 'category',
      items: ['get-started/upgrade/index']
    }
  ],
  platformSidebar: [
    {
      type: 'autogenerated',
      dirName: 'platform'
    }
  ],
  referenceSidebar: [
    'reference/index',
    {
      type: 'category',
      label: 'JavaScript',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'reference/javascript/index'
      },
      items: [
        {
          type: 'category',
          label: 'Auth',
          link: {
            type: 'doc',
            id: 'reference/docgen/javascript/auth/content/hasura-auth-client/index'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'reference/docgen/javascript/auth/content/hasura-auth-client/content'
            }
          ]
        },
        {
          type: 'category',
          label: 'Storage',
          link: {
            type: 'doc',
            id: 'reference/docgen/javascript/storage/content/hasura-storage-client/index'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'reference/docgen/javascript/storage/content/hasura-storage-client/content'
            }
          ]
        },
        {
          type: 'category',
          label: 'Functions',
          link: {
            type: 'doc',
            id: 'reference/docgen/javascript/nhost-js/content/nhost-functions-client/index'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'reference/docgen/javascript/nhost-js/content/nhost-functions-client/content'
            }
          ]
        },
        {
          type: 'category',
          label: 'GraphQL',
          link: {
            type: 'doc',
            id: 'reference/docgen/javascript/nhost-js/content/nhost-graphql-client/index'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'reference/docgen/javascript/nhost-js/content/nhost-graphql-client/content'
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'React',
      link: {
        type: 'doc',
        id: 'reference/react/index'
      },
      items: [
        'reference/react/protecting-routes',
        'reference/react/apollo',
        {
          type: 'autogenerated',
          dirName: 'reference/docgen/react/content'
        }
      ]
    },
    {
      type: 'category',
      label: 'Next.js',
      link: {
        type: 'doc',
        id: 'reference/nextjs/index'
      },
      items: [
        'reference/nextjs/protecting-routes',
        'reference/nextjs/architecture',
        {
          type: 'autogenerated',
          dirName: 'reference/docgen/nextjs/content'
        }
      ]
    },
    {
      type: 'doc',
      label: 'CLI',
      id: 'reference/cli'
    },
    {
      type: 'category',
      label: 'Hasura Auth',
      link: { type: 'doc', id: 'reference/hasura-auth/index' },
      items: [
        'reference/hasura-auth/installation',
        'reference/hasura-auth/configuration',
        'reference/hasura-auth/environment-variables',
        'reference/hasura-auth/schema',
        'reference/hasura-auth/api-reference'
      ]
    }
  ]
}

module.exports = sidebars
