export default {
  created () {
    this.singleActions = [
      {
        label: '启用',
        action: obj => {
          this.onManager('update', {
            id: obj.id,
            managerArgs: {
              data: { enabled: true },
            },
          })
        },
        meta: obj => {
          return {
            validate: !obj.enabled,
          }
        },
      },
      {
        label: '禁用',
        action: obj => {
          this.onManager('update', {
            id: obj.id,
            managerArgs: {
              data: { enabled: false },
            },
          })
        },
        meta: obj => {
          return {
            validate: obj.enabled,
          }
        },
      },
      {
        label: '更多',
        actions: obj => {
          return [
            {
              label: '调整策略',
              action: () => {
                this.createDialog('UpdateDynamicschedtagDialog', {
                  data: [obj],
                  columns: this.columns,
                  title: '调整策略',
                  onManager: this.onManager,
                })
              },
            },
            {
              label: '删除',
              action: () => {
                this.createDialog('DeleteResDialog', {
                  data: [obj],
                  columns: this.columns,
                  title: '删除动态调度标签',
                  onManager: this.onManager,
                })
              },
              meta: () => {
                return {
                  validate: obj.can_delete,
                }
              },
            },
          ]
        },
      },
    ]
  },
}
