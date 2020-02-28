import { MEDIUM_MAP } from '../../../constants'
import {
  getNameDescriptionTableColumn,
  getBrandTableColumn,
  getStatusTableColumn,
  getProjectTableColumn,
  getTimeTableColumn,
  getCopyWithContentTableColumn,
  getRegionTableColumn,
  getBillingTypeTableColumn,
} from '@/utils/common/tableColumn'
import { sizestr } from '@/utils/utils'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        formRules: [
          { required: true, message: '请输入名称' },
          { validator: this.$validate('serverCreateName') },
        ],
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'disk_size',
        title: '容量',
        minWidth: 50,
        formatter: ({ cellValue }) => {
          return sizestr(cellValue, 'M', 1024)
        },
      },
      {
        field: 'disk_format',
        title: '格式',
        width: 70,
      },
      {
        field: 'disk_type',
        title: '磁盘类型',
        width: 70,
        formatter: ({ cellValue }) => {
          return cellValue === 'sys' ? '系统盘' : '数据盘'
        },
      },
      {
        field: 'unused',
        title: '是否挂载',
        width: 70,
        slots: {
          default: ({ row }, h) => {
            return row.guest_count >= 1 ? [<span class="success-color">已挂载</span>] : [<span class="warning-color">待挂载</span>]
          },
        },
      },
      {
        field: 'guest',
        title: '主机',
        minWidth: 100,
        showOverflow: 'ellipsis',
        slots: {
          default: ({ row }, h) => {
            return [
              <div class='text-truncate'>
                {row.guest}
                {row.guest_status ? <status status={ row['guest_status'] } statusModule='server'/> : ''}
              </div>,
            ]
          },
        },
      },
      getCopyWithContentTableColumn({ field: 'storage', title: '主存储' }),
      getTimeTableColumn(),
      getBrandTableColumn(),
      getRegionTableColumn(),
      getBillingTypeTableColumn(),
      getStatusTableColumn({ statusModule: 'disk' }),
      getProjectTableColumn(),
      {
        field: 'medium_type',
        title: '介质类型',
        width: 70,
        formatter: ({ cellValue }) => {
          return MEDIUM_MAP[cellValue]
        },
      },
    ]
  },
}
