import Kubeclusters from '@K8S/views/cluster'
import KubeclustersCreate from '@K8S/views/cluster/create'
import KubeclustersImport from '@K8S/views/cluster/import'
import Deployment from '@K8S/views/deployment'
import K8sDeploymentCreate from '@K8S/views/deployment/create'
import Daemonset from '@K8S/views/daemonset'
import K8sDaemonsetCreate from '@K8S/views/daemonset/create'
import K8SNode from '@K8S/views/nodes'
import K8sStorageclasses from '@K8S/views/storage-class'
import K8sStorageclassesCreate from '@K8S/views/storage-class/create'
import K8sNamespace from '@K8S/views/namespace'
import K8sNamespaceCreate from '@K8S/views/namespace/create'
import K8sRbacrole from '@K8S/views/rbacrole'
import K8sRbacrolebind from '@K8S/views/rbacrolebind'
import K8sServiceAccount from '@K8S/views/service-account'
import K8sKubeComponent from '@K8S/views/kube-component'
import K8sKubeComponentCreate from '@K8S/views/kube-component/create'
import K8sKubeComponentUpdate from '@K8S/views/kube-component/update'
import Statefulset from '@K8S/views/statefulset'
import K8sStatefulsetCreate from '@K8S/views/statefulset/create'
import Pod from '@K8S/views/pod'
import Job from '@K8S/views/job'
import K8sJobCreate from '@K8S/views/job/create'
import CronJob from '@K8S/views/cronjob'
import K8sCronJobCreate from '@K8S/views/cronjob/create'
import Persistentvolumeclaim from '@K8S/views/persistentvolumeclaim'
import K8sPersistentvolumeclaimCreate from '@K8S/views/persistentvolumeclaim/create'
import Service from '@K8S/views/service'
import K8sServiceCreate from '@K8S/views/service/create'
import Ingress from '@K8S/views/ingress'
import K8sIngressCreate from '@K8S/views/ingress/create'
import Configmap from '@K8S/views/configmap'
import K8sConfigmapCreate from '@K8S/views/configmap/create'
import Secret from '@K8S/views/secret'
import K8sSecretCreate from '@K8S/views/secret/create'
import Layout from '@/layouts/RouterView'

import { hasSetupKey } from '@/utils/auth'

export default {
  index: 3,
  meta: {
    label: '容器',
    icon: 'menu-k8s',
    hidden: () => !hasSetupKey('k8s'),
  },
  menus: [
    {
      meta: {
        label: '应用',
      },
      submenus: [
        {
          path: '/k8s-deployment',
          meta: {
            label: '无状态',
            permission: 'k8s_deployments_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sDeploymentList',
              path: '',
              component: Deployment,
            },
            {
              name: 'K8sDeploymentCreate',
              path: 'create',
              component: K8sDeploymentCreate,
            },
          ],
        },
        {
          path: '/k8s-statefulset',
          meta: {
            label: '有状态',
            permission: 'k8s_statefulsets_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sStatefulsetList',
              path: '',
              component: Statefulset,
            },
            {
              name: 'K8sStatefulsetCreate',
              path: 'create',
              component: K8sStatefulsetCreate,
            },
          ],
        },
        {
          path: '/k8s-daemonset',
          meta: {
            label: '守护进程',
            permission: 'k8s_daemonsets_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sDaemonsetList',
              path: '',
              component: Daemonset,
            },
            {
              name: 'K8sDaemonsetCreate',
              path: 'create',
              component: K8sDaemonsetCreate,
            },
          ],
        },
        {
          path: '/k8s-job',
          meta: {
            label: '任务',
            permission: 'k8s_jobs_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sJobList',
              path: '',
              component: Job,
            },
            {
              name: 'K8sJobCreate',
              path: 'create',
              component: K8sJobCreate,
            },
          ],
        },
        {
          path: '/k8s-cronjob',
          meta: {
            label: '定时任务',
            permission: 'k8s_cronjobs_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sCronJobList',
              path: '',
              component: CronJob,
            },
            {
              name: 'K8sCronJobCreate',
              path: 'create',
              component: K8sCronJobCreate,
            },
          ],
        },
        {
          path: '/k8s-pod',
          meta: {
            label: '容器组',
            permission: 'k8s_pods_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sPodList',
              path: '',
              component: Pod,
            },
          ],
        },
        {
          path: '/k8s-persistentvolumeclaim',
          meta: {
            label: '存储声明',
            permission: 'k8s_persistentvolumeclaims_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sPersistentvolumeclaimList',
              path: '',
              component: Persistentvolumeclaim,
            },
            {
              name: 'K8sPersistentvolumeclaimCreate',
              path: 'create',
              component: K8sPersistentvolumeclaimCreate,
            },
          ],
        },
      ],
    },
    {
      meta: {
        label: '服务与负载均衡',
      },
      submenus: [
        {
          path: '/k8s-service',
          meta: {
            label: '服务',
            permission: 'k8s_services_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sServiceList',
              path: '',
              component: Service,
            },
            {
              name: 'K8sServiceCreate',
              path: 'create',
              component: K8sServiceCreate,
            },
          ],
        },
        {
          path: '/k8s-ingress',
          meta: {
            label: '路由',
            permission: 'k8s_ingresses_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sIngressList',
              path: '',
              component: Ingress,
            },
            {
              name: 'K8sIngressCreate',
              path: 'create',
              component: K8sIngressCreate,
            },
          ],
        },
      ],
    },
    {
      meta: {
        label: '应用配置',
      },
      submenus: [
        {
          path: '/k8s-configmap',
          meta: {
            label: '配置项',
            permission: 'k8s_configmaps_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sConfigmapList',
              path: '',
              component: Configmap,
            },
            {
              name: 'K8sConfigmapCreate',
              path: 'create',
              component: K8sConfigmapCreate,
            },
          ],
        },
        {
          path: '/k8s-secret',
          meta: {
            label: '保密字典',
            permission: 'k8s_secrets_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sSecretList',
              path: '',
              component: Secret,
            },
            {
              name: 'K8sSecretCreate',
              path: 'create',
              component: K8sSecretCreate,
            },
          ],
        },
      ],
    },
    {
      meta: {
        label: '集群',
      },
      submenus: [
        {
          path: '/k8s-cluster',
          meta: {
            label: '集群',
            permission: 'k8s_kubeclusters_list',
          },
          component: Layout,
          children: [
            {
              name: 'Kubeclusters',
              path: '',
              component: Kubeclusters,
            },
            {
              name: 'KubeclustersImport',
              path: 'import',
              component: KubeclustersImport,
            },
            {
              name: 'KubeclustersCreate',
              path: 'create',
              component: KubeclustersCreate,
            },
          ],
        },
        {
          path: '/k8s-node',
          meta: {
            label: '节点',
            permission: 'k8s_k8sNode_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8SNode',
              path: '',
              component: K8SNode,
            },
          ],
        },
        {
          path: '/k8s-storageclass',
          meta: {
            label: '存储类',
            permission: 'k8s_storageclasses_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sStorageclasses',
              path: '',
              component: K8sStorageclasses,
            },
            {
              name: 'K8sStorageclassesCreate',
              path: 'create',
              component: K8sStorageclassesCreate,
            },
          ],
        },
        {
          path: '/k8s-namespace',
          meta: {
            label: '命名空间',
            permission: 'k8s_namespace_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sNamespace',
              path: '',
              component: K8sNamespace,
            },
            {
              name: 'K8sNamespaceCreate',
              path: 'create',
              component: K8sNamespaceCreate,
            },
          ],
        },
        {
          path: '/k8s-rbacrole',
          meta: {
            label: '角色',
            permission: 'k8s_rbacroles_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sRbacrole',
              path: '',
              component: K8sRbacrole,
            },
          ],
        },
        {
          path: '/k8s-rbacrolebind',
          meta: {
            label: '角色绑定',
            permission: 'k8s_rbacrolebindings_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sRbacrolebind',
              path: '',
              component: K8sRbacrolebind,
            },
          ],
        },
        {
          path: '/k8s-serviceaccount',
          meta: {
            label: '服务账户',
            permission: 'k8s_serviceaccounts_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sServiceAccount',
              path: '',
              component: K8sServiceAccount,
            },
          ],
        },
        {
          path: '/k8s-kubecomponent',
          meta: {
            label: '服务组件',
            permission: 'k8s_kubeclusters_list', // 服务组件权限和 集群list 权限一致
          },
          component: Layout,
          children: [
            {
              name: 'K8sKubeComponent',
              path: '',
              component: K8sKubeComponent,
            },
            {
              name: 'K8sKubeComponentCreate',
              path: 'create',
              component: K8sKubeComponentCreate,
            },
            {
              name: 'K8sKubeComponentUpdate',
              path: 'update',
              component: K8sKubeComponentUpdate,
            },
          ],
        },
      ],
    },
  ],
}
