// import FlexNetwork from '@Network/views/flex-network'
import Wire from '@Network/views/wire'
import Network from '@Network/views/network'
import NetworkCreate from '@Network/views/network/Create'
import EditAttributes from '@Network/views/network/EditAttributes'
import Eip from '@Network/views/eip'
import GlobalVpc from '@Network/views/global-vpc'
// import RouteTableList from '@Network/views/route-table'
import NatList from '@Network/views/nats'
// import ReservedIpList from '@Network/views/reserved-ip'
import DNS from '@Network/views/dns'
import VPC from '@Network/views/vpc'
import LbList from '@Network/views/lb'
import LBCreate from '@Network/views/lb/create/index'
import LbListenerCreate from '@Network/views/loadbalancerlistener/create'
import LbaclsList from '@Network/views/lbacls'
import LbcertsList from '@Network/views/lbcerts'
import LoadbalancerclusterList from '@Network/views/loadbalancercluster'
import AgentList from '@Network/views/agent'
import AgentForm from '@Network/views/agent/form'
import Layout from '@/layouts/RouterView'

import { hasHypervisorsByEnv, hasHypervisors, hasServices, hasBrands } from '@/utils/auth'

export default {
  index: 4,
  meta: {
    label: '网络',
    icon: 'menu-network',
  },
  menus: [
    /**
     * 基础网络
     */
    {
      meta: {
        label: '基础网络',
      },
      submenus: [
        {
          path: '/globalvpc',
          meta: {
            label: '全局VPC',
            permission: 'network_globalvpcs_list',
            hidden: () => !hasBrands('Google'),
          },
          component: Layout,
          children: [
            {
              name: 'GlobalVPC',
              path: '',
              component: GlobalVpc,
            },
          ],
        },
        {
          path: '/vpc',
          meta: {
            label: 'VPC',
            permission: 'vpcs_list',
            t: 'dictionary.vpc',
          },
          component: Layout,
          children: [
            {
              name: 'VPC',
              path: '',
              component: VPC,
            },
          ],
        },
        // {
        //   path: '/routetable',
        //   meta: {
        //     label: '路由表',
        //     permission: 'route_tables_list',
        //   },
        //   component: Layout,
        //   children: [
        //     {
        //       name: 'RouteTable',
        //       path: '',
        //       component: RouteTableList,
        //     },
        //   ],
        // },
        {
          path: '/wire',
          meta: {
            label: '二层网络',
            permission: 'wires_list',
            hidden: () => !hasServices(['esxiagent', 'hostagent', 'bmagent']) && !hasBrands('ZStack'),
          },
          component: Layout,
          children: [
            {
              name: 'WireList',
              path: '',
              component: Wire,
            },
          ],
        },
        // {
        //   path: '/flexnetwork',
        //   meta: {
        //     label: '弹性网卡',
        //     permission: 'networkcard_list',
        //   },
        //   component: Layout,
        //   children: [
        //     {
        //       name: 'NetworkcardList',
        //       path: '',
        //       component: FlexNetwork,
        //     },
        //   ],
        // },
        {
          path: '/network',
          meta: {
            label: 'IP子网',
            permission: 'networks_list',
          },
          component: Layout,
          children: [
            {
              name: 'NetworkList',
              path: '',
              component: Network,
            },
            {
              name: 'NetworkCreate',
              path: 'create',
              component: NetworkCreate,
            },
            {
              name: 'NetworkUpdate',
              path: 'edit',
              component: EditAttributes,
            },
          ],
        },
        // {
        //   path: '/reservedip',
        //   meta: {
        //     label: '预留IP',
        //     permission: 'reservedips_list',
        //   },
        //   component: Layout,
        //   children: [
        //     {
        //       name: 'ReservedIP',
        //       path: '',
        //       component: ReservedIpList,
        //     },
        //   ],
        // },
      ],
    },
    /**
     * 网络服务
     */
    {
      meta: {
        label: '网络服务',
      },
      submenus: [
        {
          path: '/eip',
          meta: {
            label: '弹性公网IP',
            permission: 'eips_list',
            hidden: () => !hasHypervisorsByEnv(['idc', 'public', 'private']),
          },
          component: Layout,
          children: [
            {
              name: 'EipList',
              path: '',
              component: Eip,
            },
          ],
        },
        {
          path: '/nat',
          meta: {
            label: 'NAT网关',
            permission: 'natgateways_list',
          },
          component: Layout,
          children: [
            {
              name: 'Nat',
              path: '',
              component: NatList,
            },
          ],
        },
        {
          path: '/dns',
          meta: {
            label: '域名服务',
            permission: 'dnsrecords_list',
            hidden: () => !hasServices(['esxiagent', 'hostagent', 'bmagent']),
          },
          component: Layout,
          children: [
            {
              name: 'DNS',
              path: '',
              component: DNS,
            },
          ],
        },
      ],
    },
    /**
     * 负载均衡
     */
    {
      meta: {
        label: '负载均衡',
        hidden: () => !hasServices('lbagent') && !hasHypervisors(['aliyun', 'qcloud', 'huawei', 'aws']),
      },
      submenus: [
        {
          path: '/lb',
          meta: {
            label: '实例',
            permission: 'lb_loadbalancers_list',
          },
          component: Layout,
          children: [
            {
              name: 'LBList',
              path: '',
              component: LbList,
            },
            {
              name: 'LBCreate',
              path: 'create',
              component: LBCreate,
            },
            {
              name: 'LBSDetailListenerCreate',
              path: ':id/listener-create',
              component: LbListenerCreate,
            },
            {
              name: 'LBSDetailListenerUpdate',
              path: ':id/listener-update',
              component: LbListenerCreate,
            },
          ],
        },
        {
          path: '/lbacl',
          meta: {
            label: '访问控制',
            permission: 'lb_loadbalanceracls_list',
          },
          component: Layout,
          children: [
            {
              name: 'LbaclList',
              path: '',
              component: LbaclsList,
            },
          ],
        },
        {
          path: '/lbcert',
          meta: {
            label: '证书',
            permission: 'lb_loadbalancercertificates_list',
          },
          component: Layout,
          children: [
            {
              name: 'LbcertList',
              path: '',
              component: LbcertsList,
            },
          ],
        },
      ],
    },
    /**
     * 负载均衡集群
     */
    {
      meta: {
        label: '负载均衡集群',
      },
      submenus: [
        {
          path: '/cluster',
          meta: {
            label: '集群',
            permission: 'lb_loadbalancerclusters_list',
          },
          component: Layout,
          children: [
            {
              name: 'LoadbalancerclusterList',
              path: '',
              component: LoadbalancerclusterList,
            },
          ],
        },
        {
          path: '/lbagent',
          meta: {
            label: '节点',
            permission: 'lb_loadbalanceragents_list',
          },
          component: Layout,
          children: [
            {
              name: 'AgentList',
              path: '',
              component: AgentList,
            },
            {
              name: 'AgentForm',
              path: 'form',
              component: AgentForm,
            },
          ],
        },
      ],
    },
  ],
}
