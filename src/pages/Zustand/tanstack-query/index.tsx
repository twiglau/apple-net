import { useShallow } from "zustand/react/shallow"
import { useUserStore } from "../store/tanstack-query"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "./api";
import Filter from "./filter"
import { Avatar, Button, Space, Table, Tag } from "antd";


const UserListDemo: React.FC = () => {
    const {
        queryParams,
        selectedRowKeys,
        setPagination,
        setSelectedRowKeys

    } = useUserStore(useShallow(state => ({
        queryParams: state.queryParams,
        selectedRowKeys: state.selectedRowKeys,
        setPagination: state.setPagination,
        setSelectedRowKeys: state.setSelectedRowKeys
    })));


    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: () => getUserInfo(queryParams),
        placeholderData: (perviousData) => perviousData
    })

    // 选中配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (news: React.Key[]) => {
            setSelectedRowKeys(news);
        }
    }
    function __handleTableChange(pagination: any) {
        setPagination(pagination.current, pagination.pageSize);
    }

    return (
        <div className="p-4">
            <Filter />

            {/* 操作栏 */}
            <div style={{ marginBottom: 16}}>
                <Space>
                    <Button type="primary" disabled={selectedRowKeys.length === 0}>
                        批量删除 {selectedRowKeys.length}
                    </Button>
                    <span>当前页码: {queryParams.page}</span>
                </Space>
            </div>

            {/* 数据表格 */}
            <Table
             rowKey="id"
             dataSource={data?.list || []}
             loading={isLoading || isFetching}
             rowSelection={rowSelection}
             onChange={__handleTableChange}
             pagination={{
                current: queryParams.page,
                pageSize: queryParams.pageSize,
                total: data?.total || 0,
                showSizeChanger: true,
                showQuickJumper: true
             }}
            >
                <Table.Column title="用户" dataIndex="fullname" key="fullname" ellipsis render={
                    (_:string, record:any) => (
                        <Space>
                            <Avatar src={record.picture.thumbnail} />
                            <div>
                                <div className="hidden sm:block line-clamp-1" style={{fontWeight: 500}}>
                                    {record.name.first} {record.name.last}
                                </div>
                                <div className="hidden sm:block line-clamp-1" style={{fontSize: 12, color: '#999'}}>
                                    {record.email}
                                </div>
                            </div>
                        </Space>
                    )
                } />
                <Table.Column title="性别" dataIndex={"gender"} key={"gender"} width={100} render={
                    (gender:string) => (
                        <Tag color={gender === 'female' ? 'magenta': 'blue'}>
                            {gender}
                        </Tag>
                    )
                } />
                <Table.Column title="国籍" dataIndex={"nat"} key={"nat"} width={60} />
                <Table.Column title="描述" dataIndex={"desc"} key={"desc"} ellipsis/>

            </Table>
        </div>
    )
}

export default UserListDemo;