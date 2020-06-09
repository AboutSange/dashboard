import {
  getOperationColumns,
  getLabelTypeColumns,
  getTimerDescColumns,
} from '../utils/columns'
import {
  getNameDescriptionTableColumn,
  getEnabledTableColumn,
  getStatusTableColumn,
  getTimeTableColumn,
  getProjectTableColumn,
} from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{ row.name }</side-page-trigger>
          )
        },
      }),
      getEnabledTableColumn({ minWidth: 10 }),
      getStatusTableColumn({ statusModule: 'scheduledtask', minWidth: 10 }),
      getOperationColumns(),
      getLabelTypeColumns(),
      getTimerDescColumns(),
      getTimeTableColumn(),
      getProjectTableColumn(),
    ]
  },
}
