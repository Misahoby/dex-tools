import { useState, useEffect, useCallback, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Row, Col, Button, Select, Space, Input } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce'
import { DeXTradePairsTable } from '../components/tables/dex-pairs'
import { DeXTransactionsTable } from '../components/tables/dex-transactions'
import { DEX_PROTOCOLS, BitQueryDeXTradeRes } from '../common/types/bitquery'
import { Pagination } from '../common/types/general'
import { openNotificationWithIcon } from '../common/utilities/notifications'
import { getUniSwapTrades } from '../common/api/bitquery'
const { Option } = Select

interface DeXQuery {
  protocol: DEX_PROTOCOLS,
  currency: string,
  pagination: Pagination
}

const Home: NextPage = () => {
  const [ephemeral, setEphemeral] = useState({ loading: false })
  const [trades, setTrades] = useState<BitQueryDeXTradeRes | null>(null)
  const [transactions, setTransactions] = useState<BitQueryDeXTradeRes | null>(null)

  const [query, setQuery] = useState<DeXQuery>({
    protocol: DEX_PROTOCOLS.US2,
    currency: '',
    pagination: { perPage: 100, page: 1 }
  })

  useEffect(() => {
    debouncedRequestDeXTrades()
  }, [query])

  const requestDexTrades = () => {
    setEphemeral({ ...ephemeral, loading: true })
    getUniSwapTrades({
      protocol: query.protocol,
      perPage: query.pagination.perPage,
      offset: query.pagination.perPage * (query.pagination.page - 1),
      currency: query.currency
    }).then((res: BitQueryDeXTradeRes) => {
      if (query.currency) {
        setTransactions(res)
      } else {
        setTrades(res)
      }
      setEphemeral({ ...ephemeral, loading: false })
    }, error => {
      openNotificationWithIcon('error', 'Something Wrong', 'Please check internet connection.')
      setEphemeral({ ...ephemeral, loading: false })
    })
  }

  const debouncedRequestDeXTrades = useCallback(debounce(requestDexTrades, 300), [query])

  const onChangePagination = (diff: number) => {
    setQuery({
      ...query,
      pagination: {
        ...query.pagination,
        page: Math.max(1, query.pagination.page + diff)
      }
    })
  }

  const onChangeProtocol = (prtc: DEX_PROTOCOLS) => {
    setQuery({
      ...query,
      protocol: prtc,
      currency: '',
      pagination: {
        ...query.pagination,
        page: 1
      }
    })
  }

  const onChangeCurrency = (currency: string) => {
    setQuery({
      ...query,
      currency,
      pagination: {
        ...query.pagination,
        page: 1
      }
    })
  }

  return (<Fragment>
    <Row justify="center" className="mt-30">
      <Col>
        <p className="font-size-30">Welcome to <a href="#">DeX Tools</a></p>
      </Col>
    </Row>
    <Row justify="space-between" gutter={4} className="mb-10 px-10">
      <Col xs={24} sm={12}>
        <Space className="font-size-10">
          Currency:{' '}
          <Input placeholder="Please type currency address and press Enter" value={query.currency} onChange={event => onChangeCurrency(event.target.value)} />
        </Space>
      </Col>
      <Col xs={24} sm={12}>
        <Space className="font-size-10">
          Protocol:{' '}
          <Select defaultValue={query.protocol} loading={ephemeral.loading} onChange={onChangeProtocol} style={{ width: 200 }}>
            <Option value={DEX_PROTOCOLS.US2}>UniSwap v2</Option>
            <Option value={DEX_PROTOCOLS.US3}>UniSwap v3</Option>
            <Option value="PS" disabled>PancakeSwap</Option>
          </Select>
        </Space>
      </Col>
    </Row>
    <Row justify="center" className="mb-30 px-10">
      <Col span={24}>
      {!query.currency ? <DeXTradePairsTable dexTrades={trades} onChangeCurrency={onChangeCurrency} /> : <DeXTransactionsTable dexTransactions={transactions} />}
      </Col>
      <Col className="ml-auto pt-10">
        <Button disabled={ephemeral.loading || query.pagination.page < 2} type="primary" icon={<LeftOutlined />} onClick={() => onChangePagination(-1)} />
        <Space className="mx-5">{query.pagination.page}</Space>
        <Button disabled={ephemeral.loading} type="primary" icon={<RightOutlined />} onClick={() => onChangePagination(1)} />
      </Col>
    </Row>
  </Fragment>)
}

export default Home
