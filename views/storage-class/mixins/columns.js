export default {
  created () {
    this.columns = [
      {
        field: 'name',
        title: '名称',
        width: 300,
        slots: {
          default: ({ row }, h) => {
            const ret = [<side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>]
            return ret
          },
        },
      },
      {
        field: 'isDefault',
        title: '默认',
        minWidth: 100,
        formatter: ({ row }) => {
          return row.isDefault ? '是' : '否'
        },
      },
      {
        field: 'provisioner',
        title: '供应者',
        minWidth: 100,
      },
      {
        field: 'creationTimestamp',
        title: '创建于',
        minWidth: 70,
        formatter: ({ cellValue }) => {
          return this.$moment(cellValue).fromNow()
        },
      },
    ]
  },
}
