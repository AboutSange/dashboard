import PasswordFetcher from '@Compute/sections/PasswordFetcher'
import { RDS_ACCOUNT_PRIVILEGES } from '@DB/constants'
import { getStatusTableColumn, getNameDescriptionTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        vm: this,
        hideField: true,
        edit: false,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{row.name}</side-page-trigger>
          )
        },
      }),
      getStatusTableColumn({ statusModule: 'rdsAccount' }),
      {
        field: 'password',
        title: this.$t('db.text_195'),
        minWidth: 100,
        slots: {
          default: ({ row }) => {
            return [<PasswordFetcher serverId={row.id} resourceType='dbinstanceaccounts' />]
          },
        },
      },
      {
        field: 'dbinstanceprivileges',
        minWidth: 200,
        title: this.$t('db.text_196'),
        slots: {
          default: ({ row }) => {
            if (row.dbinstanceprivileges && row.dbinstanceprivileges.length > 0) {
              return row.dbinstanceprivileges.map(({ database, privileges }) => {
                return <div>{database} <span style="color:#666;margin:0 0 0 3px">({RDS_ACCOUNT_PRIVILEGES[privileges]})</span></div>
              })
            }
          },
        },
      },
    ]
  },
}
