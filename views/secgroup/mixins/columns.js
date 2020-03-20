import {
  getProjectTableColumn,
  getNameDescriptionTableColumn,
  isPublicTableColumn,
} from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'guest_cnt',
        title: '关联虚拟机',
        width: 70,
      },
      isPublicTableColumn(),
      {
        field: 'rules',
        title: '规则预览(策略，来源，协议，端口)',
        width: 220,
        type: 'expand',
        slots: {
          content: ({ row }, h) => {
            const inList = []
            const outList = []
            row.rules.forEach(obj => {
              let text = ''
              if (obj.action) text += `${obj.action}`
              if (obj.cidr) text += `，${obj.cidr}`
              if (obj.protocol) text += `，${obj.protocol}`
              if (obj.ports) text += `，${obj.ports}`
              if (obj.direction === 'in') {
                inList.push({
                  value: text,
                })
              } else if (obj.direction === 'out') {
                outList.push({
                  value: text,
                })
              }
            })
            const ret = []
            if (inList.length > 0) {
              ret.push(
                <div class='mb-2 d-flex'>
                  <div class='flex-grow-0 flex-shrink-0'>出方向：</div>
                  <div>{ outList.map(item => <a-tag class='mb-2'>{ item.value }</a-tag>) }</div>
                </div>
              )
            }
            if (outList.length > 0) {
              ret.push(
                <div class='d-flex'>
                  <div class='flex-grow-0 flex-shrink-0'>入方向：</div>
                  <div>{ inList.map(item => <a-tag class='mb-2'>{ item.value }</a-tag>) }</div>
                </div>
              )
            }
            if (ret.length <= 0) {
              ret.push(
                <div>暂无规则</div>
              )
            }
            return ret
          },
        },
      },
      getProjectTableColumn(),
    ]
  },
}
