import { shallowMount } from '@vue/test-utils'
import VmPublicCreateBill from '../index.vue'

describe('VmPublicCreateBill', () => {
  it('check buyDurationOptions in aliyun, first item is 1W', () => {
    const decorators = {
      billType: [
        'billType',
        {
          initialValue: 'quantity',
        },
      ],
      duration: [
        'duration',
        {
          initialValue: '1M',
        },
      ],
    }
    const providerList = ['aliyun']
    const wrapper = shallowMount(VmPublicCreateBill, {
      propsData: {
        decorators,
        providerList,
      },
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.buyDurationOptions[0]).toEqual({
        label: '1周',
        key: '1W',
        unit: 'W',
        includes: ['aliyun'],
      })
    })
  })
})
