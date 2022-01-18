import { useState, useEffect, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Row, Col, Button } from 'antd'
import { DeXPairsTable } from '../components/tables/dex-pairs'
import { DEX_PROTOCOLS } from '../common/enums/types'
import { openNotificationWithIcon } from '../common/utilities/notifications'
import { getUniSwapTrades } from '../common/api/bitquery'

const Home: NextPage = () => {
  const [ephemeral, setEphemeral] = useState({})
  const [trades, setTrades] = useState(null)

  useEffect(() => {
    console.log(trades)
  }, [trades])

  const requestDexTrades = (type) => {
    if (!type || !Object.keys(DEX_PROTOCOLS).includes(type)) {
      openNotificationWithIcon('error', 'Something Wrong', 'Unsupported protocol is requested. Please check it again.')
      return;
    }
    const protocol = DEX_PROTOCOLS[type]
    setEphemeral({ ...ephemeral, [type]: true })
    getUniSwapTrades(protocol).then(trds => {
      setEphemeral({ ...ephemeral, [type]: false })
      setTrades(trds)
    }, error => {
      setEphemeral({ ...ephemeral, [type]: false })
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
        <p className="font-size-15">
          Get started by clicking{' '}
          <Button type="primary" loading={ephemeral.US2} shape="round" size="large" onClick={() => {requestDexTrades('US2')}}>Uniswap v2</Button>
          {' '}or{' '}
          <Button type="primary" loading={ephemeral.US3} shape="round" size="large" onClick={() => {requestDexTrades('US3')}}>Uniswap v3</Button>
          {' '}or{' '}
          <Button type="primary" loading={ephemeral.PS} shape="round" size="large" onClick={() => {requestDexTrades('PS')}} danger>PancakeSwap</Button>
        </p>
      </Col>
    </Row>
    <Row justify="center">
      <Col span={24}>
        <DeXPairsTable />
      </Col>
    </Row>
  </Fragment>)
}

export default Home
