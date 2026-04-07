import { useShallow } from "zustand/react/shallow"
import { useUserStore } from "../store/tanstack-query"
import { Form, Button, Input, Select, Space } from "antd"



const Filter: React.FC = () => {
    const { setFilters, resetFilters } = useUserStore(useShallow(state => ({
        setFilters: state.setFilters,
        resetFilters: state.resetFilters
    })));

    const [form] = Form.useForm();

    function __handleReset(e: React.MouseEvent) {
        form.resetFields();
        resetFilters();
    }
    function __handleSearch(values: any) {
        setFilters(values);
    }

    return (
        <Form
         className="mb-4! border-b border-gray-200 pb-4!"
         form={form}
         layout="inline"
         onFinish={__handleSearch}
         initialValues={{gender: undefined, nat: undefined}}
        >
            <Form.Item name="keyword" label="搜索">
                <Input placeholder="输入姓名或邮箱" allowClear />
            </Form.Item>
            <Form.Item name="gender" label="性别">
                <Select
                style={{width: 120}}
                allowClear
                placeholder="不限"
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" }
                ]}
                />
            </Form.Item>
            <Form.Item name="nat" label="国籍">
                <Select
                 style={{width: 120}}
                 allowClear
                 placeholder="不限"
                 options={[
                    { label: "US", value: "US" },
                    { label: "FR", value: "FR" },
                    { label: "GB", value: "GB" }
                 ]}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button onClick={__handleReset}>重置</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default Filter;