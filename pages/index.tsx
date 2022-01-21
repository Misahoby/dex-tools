import { useState, useEffect, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Row, Col, Button, Select, Space } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { DeXPairsTable } from '../components/tables/dex-pairs'
import { DEX_PROTOCOLS, DeXPair } from '../common/types/bitquery'
import { Pagination } from '../common/types/general'
import { openNotificationWithIcon } from '../common/utilities/notifications'
import { getUniSwapTrades } from '../common/api/bitquery'
const { Option } = Select

const Home: NextPage = () => {
  const [ephemeral, setEphemeral] = useState({ loading: false })
  const [trades, setTrades] = useState<DeXPair | null>(null)
  const [protocol, setProtocol] = useState<DEX_PROTOCOLS>(DEX_PROTOCOLS.US2)
  const [pagination, setPagination] = useState<Pagination>({ perPage: 100, page: 1 })

  useEffect(() => {
    requestDexTrades()
  }, [protocol, pagination])

  const requestDexTrades = () => {
    setEphemeral({ ...ephemeral, loading: true })
    getUniSwapTrades(protocol, pagination.perPage, pagination.perPage * (pagination.page - 1)).then((trds: DeXPair) => {
      setTrades(trds)
      setEphemeral({ ...ephemeral, loading: false })
    }, error => {
      openNotificationWithIcon('error', 'Something Wrong', 'Please check internet connection.')
      setEphemeral({ ...ephemeral, loading: false })
    })
  }

  const onChangePagination = (diff: number) => {
    setPagination({ ...pagination, page: Math.max(0, pagination.page + diff) })
  }

  return (<Fragment>
    <Row justify="center" className="mt-30">
      <Col>
        <p className="font-size-30">Welcome to <a href="#">DeX Tools</a></p>
      </Col>
    </Row>
    <Row justify="center">
      <Col>
        <Space className="font-size-15 mb-10">
          Get pairs on {' '}
          <Select defaultValue={protocol} size="large" loading={ephemeral.loading} onChange={setProtocol}>
            <Option value={DEX_PROTOCOLS.US2}>UniSwap v2</Option>
            <Option value={DEX_PROTOCOLS.US3}>UniSwap v3</Option>
            <Option value="PS" disabled>PancakeSwap</Option>
          </Select>
        </Space>
      </Col>
    </Row>
    <Row justify="center" className="mb-30">
      <Col span={24}>
        <DeXPairsTable dexTrades={trades}/>
      </Col>
      <Col className="ml-auto pt-10">
        <Button disabled={ephemeral.loading} type="primary" icon={<LeftOutlined />} onClick={() => onChangePagination(-1)} />
        <Space className="mx-5">{pagination.page}</Space>
        <Button disabled={ephemeral.loading} type="primary" icon={<RightOutlined />} onClick={() => onChangePagination(1)} />
      </Col>
    </Row>
  </Fragment>)
}

export default Home
