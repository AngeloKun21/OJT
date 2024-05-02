<template>
  <div class="dashboard_style">
    <div class="parent_div">
      <a-col :span="24">
        <p class="flex items-center font-mono pt-2 pl-6 text-3xl font-bold"><TableOutlined class="text-4xl pr-2"/>ACCOUNT VIEW LIST</p>
      </a-col>
        
      <a-table style=" color: black;"  class="table" :columns="columns" :data-source="displayedData" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex !== 'operation'">
            <div>
              <template v-if="column.dataIndex === 'firstName' || column.dataIndex === 'lastName'">
                <a-input
                  v-if="editableData[record.id]"
                  v-model:value="editableData[record.id][column.dataIndex]"
                  style="margin: -  5px;"
                />
                <template v-else>
                  {{ text }}
                </template>
              </template>
              <template v-else>
                <template v-if="editableData[record.id]">
                  <a-input
                    v-if="column.dataIndex === 'address'"
                    v-model:value="editableData[record.id][column.dataIndex]"
                    style="margin: -5px 0"
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </template>
                <template v-else>
                  {{ text }}
                </template>
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.id]"> 
                <a-typography-link @click="saveData(record.id)">Save</a-typography-link>
                <a-popconfirm  title="Sure to cancel?" @confirm="cancel(record.id)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              
              <span v-else>
                <a @click="edit(record.id)"><EditOutlined /></a>
                <a-popconfirm title="Are you sure?" @confirm="removeData(record.id)">
                  <a><DeleteOutlined style="margin-left: 20%;"  /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
    
</template>
<script lang='ts' setup>
import { ref, computed, reactive } from "vue";
import { cloneDeep } from 'lodash-es';

declare function definePageMeta(meta: any): void;
definePageMeta({
    layout: 'dashboard'
});

const columns = [
  {
    title: 'FirstName',
    dataIndex: 'firstName',
    width: '25%',
  },
  {
    title: 'MiddleName',
    dataIndex: 'middleName',
    width: '25%',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    width: '25%',
  },
  {
    title: 'email',
    dataIndex: 'email',
    width: '25%',
  },
  {
    title: 'password',
    dataIndex: 'password',
    width: '25%',
  },
  {
    title: 'usertypeadmin',
    dataIndex: 'usertypeadmin',
    width: '25%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
  },
];

const DATA = ref([]);
async function fetchData() {
  const data = await fetch("http://localhost:5000/users/", {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`,
    },
  }).then((res) => res.json());
  DATA.value = data;
}
fetchData();

const pagination = ref({
  current: 1,
  pageSize: 10,
});
function paginationChange(page: number) {
  pagination.value.current = page;
}
const displayedData = computed(() => {
  const startIndex = (pagination.value.current - 1) * pagination.value.pageSize;
  const endIndex = startIndex + pagination.value.pageSize;
  return DATA.value.slice(startIndex, endIndex);
});
const editableData = reactive({});
const edit = (id: string) => {
  editableData[id] = cloneDeep(displayedData.value.find((item: any) => item.id === id));
};
const saveData = async (id: string) => {
  try {
    const data = DATA.value.find((item: any) => item.id === id);
    const updatedData = cloneDeep(editableData[id]);
    await saveData(updatedData);
    const index = DATA.value.findIndex((item: any) => item.id === id);
    DATA.value.splice(index, 1, (updatedData));
    delete editableData[id];
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
async function deleteData(id) {
  try {
    const remove = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`,
      },
    });
    if (!remove.ok) {
      throw new Error("Failed to remove data.");
    }
    return remove.json();
  } catch (error) {
    console.error("Error removing data:", error);
    throw error;
  }
}
const removeData = async (id: string) => {
  try {
    await deleteData(id);
    const index = DATA.value.findIndex((item: any) => item.id === id);
    DATA.value.splice(index, 1);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};

const cancel = (id: string) => {
  delete editableData[id];
};
</script>

<style scoped>
.table{
  position: absolute;
  top: 55%;
  left: 57%;
  translate: -50% -50%;
  width:75%;
}
.editable-row-operations a {
  margin-right: 8px;
}
.dashboard_style {
    min-height: 100dvh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("~/assets/images/default-reverse.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
}
.parent_div{
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    align-items: center;
    height: 36em;
    width: 83em;
}  
</style>
