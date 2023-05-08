import {defineComponent, ref, computed} from "vue"
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 250
    },
    heightItem: {
      type: Number,
      default: 45
    },
    extrasItem: {
      type: Number,
      default: 20
    },
    daleyUpdate: {
      type: Number,
      default: 5
    },
    headers: {
      type: Array as PropType<Header[]>,
      default: () => []
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    headerFixed: Boolean
  },
  setup(props, {slots}) {
    const firstItem = ref<number>(0)

    const quantityItemsRender = computed(() => Math.trunc(props.height / props.heightItem) + props.extrasItem);

    const itemsRender = computed(() => props.items.slice(firstItem.value, firstItem.value + quantityItemsRender.value))

    const scrollHeigthBottom = computed(() => {
      const heightBeforeBottom = (firstItem.value + quantityItemsRender.value) * props.heightItem
      return Math.max((props.items.length * props.heightItem) - heightBeforeBottom, 0);
    })

    function updateFirstItem(scrollTop: number): void {
      firstItem.value = Math.max(Math.floor(scrollTop / props.heightItem) - (props.extrasItem / 2), 0)
    }

    let timerUpdate: number

    function scroll(ev: UIEvent): void {
      // @ts-ignore
      const scrollTop = ev.target.scrollTop;
      clearTimeout(timerUpdate)
      timerUpdate = setTimeout(() => updateFirstItem(scrollTop), props.daleyUpdate);
    }

    function renderFisrtRow(): JSX.Element | null {
      if (firstItem.value === 0) return null

      return (
        <tr style={{height: `${firstItem.value * props.heightItem}px`}} class="bg-gray-50">
          <td colspan={props.headers.length} />
        </tr>
      )
    }

    const styleRowComputed = computed(() => ({
      height: `${props.heightItem}px`,
    }))

    return () => <>
      <div
        onScroll={scroll}
        class="overflow-y-auto bg-gray-50"
        style={{ height: `${props.height}px` }}
      >
        <div
          class="p-0 mt-0 mx-0"
          style={{ marginBottom: `${scrollHeigthBottom.value}px` }}
        >
          <table class="w-full bg-white border-collapse">
            <thead class={{ "sticky top-0 z-10": props.headerFixed }}>
              <tr>
                {props.headers.map(header => (
                  <th class="bg-white p-0 border-b">
                    <div class="border-b font-bold">
                      {header.text}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {renderFisrtRow()}

              {itemsRender.value.map((item, index) => (
                <tr style={styleRowComputed.value} class="border-b">
                  {props.headers.map(header => (<td>{item[header.value]}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-right py-1.5 px-1 border-t text-sm">
        <span class="font-medium">Qtde. Itens: </span>
        {props.items?.length}
      </div>
    </>
  }
})
