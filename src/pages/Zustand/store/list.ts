import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TodoItem {
  id: string;
  text: string;
  selected: boolean;
}

interface ListState {
  ids: string[];
  entities: Record<string, TodoItem>;

  setData: (items: TodoItem[]) => void;
  toggleSelection: (id: string) => void;
  updateText: (id: string, text: string) => void;
  removeItem: (id: string) => void;
}

export const useListStore = create<ListState>()(
  immer((set) => ({
    ids: [],
    entities: {},

    // 1. 刷新、设置列表
    setData: (items) => {
      const ids = items.map((item) => item.id);
      const entities = items.reduce(
        (acc, item) => {
          acc[item.id] = item;
          return acc;
        },
        {} as Record<string, TodoItem>,
      );

      set((state) => {
        // 直接赋值即可
        state.ids = ids;
        state.entities = entities;
      });
    },

    // 2. 选中操作：直接修改深层属性
    toggleSelection: (id) => {
      set((state) => {
        const item = state.entities[id];
        if (item) {
          item.selected = !item.selected;
        }
      });
    },

    // 3. 编辑操作
    updateText: (id, text) => {
      set((state) => {
        const item = state.entities[id];
        if (item) {
          item.text = text;
        }
      });
    },

    // 4. 删除操作
    removeItem: (id) => {
      set((state) => {
        // 直接 delete 对象属性
        delete state.entities[id];

        // 数组可以直接使用 splice, 或者过滤后重新赋值
        const index = state.ids.indexOf(id);
        if (index !== -1) {
          state.ids.splice(index, 1);
        }

        // 也可以写成
        // state.ids = state.ids.filter(itemId => itemId !== id);
      });
    },
  })),
);
