import * as R from 'ramda'
import _ from 'lodash'

export const k8sStatusColumn = ({ path = 'podsInfo.warnings', statusModule = 'k8s_resource' } = {}) => {
  return {
    field: 'status',
    title: '状态',
    width: 100,
    slots: {
      default: ({ row }, h) => {
        const warnings = (_.get(row, path) || []).map(v => v.message)
        let warnTooltip = null
        if (warnings && warnings.length) {
          warnTooltip = (
            <a-tooltip placement="top">
              <template slot="title">
                { warnings.map(val => (<div> { val } </div>)) }
              </template>
              <a-icon type="bulb" theme="twoTone" twoToneColor="#f5222d" class="mr-2" />状态异常
            </a-tooltip>
          )
        }
        console.log(statusModule, 'statusModule')
        return [
          <div class='text-truncate'>
            <status status={ row.status } statusModule={ statusModule }>
              { warnTooltip }
            </status>
          </div>,
        ]
      },
    },
  }
}

export const k8sLabelColumn = ({ field = 'labels', title = '标签' } = {}) => {
  return {
    field,
    title,
    minWidth: 200,
    slots: {
      default: ({ row }, h) => {
        if (!row[field] || !R.is(Object, row[field])) return '-'
        const colors = ['pink', 'orange', 'green', 'cyan', 'blue', 'purple', 'red']
        const labels = Object.entries(row[field]).map(arr => ({ key: arr[0], value: arr[1] }))
        return [
          <div>
            {
              labels.map((val, i) => {
                return (<div class="mb-1"><a-tag class="d-block text-truncate" color={ colors[i % colors.length] }>{ `${val.key}：${val.value}` }</a-tag></div>)
              })
            }
          </div>,
        ]
      },
    },
  }
}

export const k8sImageColumn = ({ field = 'containerImages', title = '镜像', itemField = 'image' } = {}) => {
  return {
    field,
    title,
    minWidth: 200,
    slots: {
      default: ({ row }, h) => {
        return row[field].map(v => {
          return (<a-tag class="d-block text-truncate mb-1" style="max-width: 400px;" title={v[itemField]}>{ v[itemField] }</a-tag>)
        })
      },
    },
  }
}

export const k8sEnvColumn = ({ field = 'env', title = '环境变量' } = {}) => {
  return {
    field,
    title,
    slots: {
      default: ({ row }, h) => {
        if (!row[field] || !R.is(Array, row[field])) return '-'
        return [
          <div>
            {
              row[field].map((val, i) => {
                return (<div class="mb-1" title={`${val.name}：${val.value || '-'}`}><a-tag class="d-block text-truncate">{ `${val.name}：${val.value || '-'}` }</a-tag></div>)
              })
            }
          </div>,
        ]
      },
    },
  }
}
