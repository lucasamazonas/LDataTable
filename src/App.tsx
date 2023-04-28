import LDataTable from "@/components/LDataTable/LDataTable";
import {ref} from "vue";

const header = { text: "oi", value: "idproduto"}
const headers = ref([header, header, header, header]);

const items = Array(1000).fill(0)
  .map((_, index) => ({idproduto: index}))

export default () => (
  <div
    onClick={() => headers.value.push(header)}
    style={{
      height: "400px",
      width: "100%"
    }}
  >
    <LDataTable
      height={500}
      heightItem={30}
      headers={headers.value}
      items={items}
    />
  </div>
)
