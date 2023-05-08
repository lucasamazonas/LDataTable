import {defineComponent, ref} from "vue"
import LDataTable from "@/components/LDataTable/LDataTable"

const headers: Header[] = [
  { text: "Id Produto", value: "idproduto" },
  { text: "Nome Produto", value: "nome" },
  { text: "Estoque", value: "idproduto" },
  { text: "Estoque Máximo", value: "idproduto" },
  { text: "Estoque Reservado", value: "idproduto" },
  { text: "Estoque Ideal", value: "idproduto" },
  { text: "Status Produto", value: "status_produto" },
]

const items = Array(30000).fill(0).map((item, idx) => ({
  nome: "Nome do produto " + item,
  idproduto: idx,
  status_produto: "1. Em Excesso"
}))

export default defineComponent({
  setup() {
    return () => (
      <div class="mt-10 px-10">
        <LDataTable
          height={500}
          heightItem={40}
          headers={headers}
          headerFixed
          extrasItem={2}
          items={items}
        >{{
          // default: () => (<div>ola mundo</div>)
        }}</LDataTable>
      </div>
    )
  }
})
