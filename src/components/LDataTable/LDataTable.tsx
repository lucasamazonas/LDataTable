import "./LDataTable.css"
import {computed, ref} from "vue"

interface Header {
  text: string,
  value: string,
}

interface Props {
  height: number,
  heightItem: number,
  headers: Header[],
  items: any[],
}

const firstItem = ref<number>(0)

export default (props: Props) => {
  const quantityItemsRender = computed(() => Math.ceil(
    props.height / props.heightItem))

  const itemsRender = computed(() => props.items.slice(
    firstItem.value, firstItem.value + quantityItemsRender.value))

  const scrollHeightBottom = computed(() => {
    const heightBeforeBottom = (firstItem.value + quantityItemsRender.value) * props.heightItem
    return Math.max((props.items.length * props.heightItem) - heightBeforeBottom, 0);
  })

  function onScroll(ev: UIEvent) {
    firstItem.value = Math.trunc(ev.target.scrollTop / props.heightItem)
  }

  return (
    <div
      style={{height: `${props.height}px`}}
      class="l-data-table"
      onScroll={onScroll}
    >
      <div style={{marginBottom: `${scrollHeightBottom.value}px`}}>
        <table>
          <thead>
            <tr>
              {props.headers.map(header => (<th>{header.text}</th>))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{paddingTop: `${firstItem.value * props.heightItem}px`}}
                colspan={props.headers.length}
              />
            </tr>

            {itemsRender.value.map(item => (
              <tr>
                {props.headers.map(header => (
                  <td>{item[header.value]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
