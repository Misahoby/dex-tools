import { useState, useEffect, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Row, Col, Button, Select } from 'antd'
import { DeXPairsTable } from '../components/tables/dex-pairs'
import { DEX_PROTOCOLS, DeXPair } from '../common/types/bitquery'
import { openNotificationWithIcon } from '../common/utilities/notifications'
import { getUniSwapTrades } from '../common/api/bitquery'
const { Option } = Select

const Home: NextPage = () => {
  const [ephemeral, setEphemeral] = useState({
    loading: false,
    defProtocol: DEX_PROTOCOLS.US2
  })
  const [trades, setTrades] = useState<DeXPair | null>(null)

  useEffect(() => {
    requestDexTrades(ephemeral.defProtocol)
  }, [])

  const requestDexTrades = (protocol: DEX_PROTOCOLS) => {
    setEphemeral({ ...ephemeral, loading: true })
    getUniSwapTrades(protocol).then((trds: DeXPair) => {
      setEphemeral({ ...ephemeral, loading: false })
      setTrades(trds)
    }, error => {
      setEphemeral({ ...ephemeral, loading: false })
      openNotificationWithIcon('error', 'Something Wrong', 'Please check internet connection.')
    })
  }
  return (<Fragment>
    <Row justify="center" className="pt-30">
      <Col>
        <p className="font-size-30">Welcome to <a href="#">DeX Tools</a></p>
      </Col>
    </Row>
    <Row justify="center">
      <Col>
        <div className="font-size-15 mb-10">
          Get pairs on {' '}
          <Select defaultValue={ephemeral.defProtocol} size="large" loading={ephemeral.loading} onChange={requestDexTrades}>
            <Option value="DEX_PROTOCOLS.US2">UniSwap v2</Option>
            <Option value="DEX_PROTOCOLS.US3">UniSwap v3</Option>
            <Option value="PS" disabled>PancakeSwap</Option>
          </Select>
        </div>
      </Col>
    </Row>
    <Row justify="center">
      <Col span={24}>
        <DeXPairsTable dexTrades={trades}/>
      </Col>
    </Row>
  </Fragment>)
}

export default Home
