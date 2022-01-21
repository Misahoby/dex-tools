import { useState, useEffect, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Row, Col, Button, Select } from 'antd'
import { DeXPairsTable } from '../components/tables/dex-pairs'
import { DEX_PROTOCOLS } from '../common/enums/types'
import { openNotificationWithIcon } from '../common/utilities/notifications'
import { getUniSwapTrades } from '../common/api/bitquery'
const { Option } = Select;

const Home: NextPage = () => {
  const [ephemeral, setEphemeral] = useState({
    loading: false
  })
  const [trades, setTrades] = useState([])

  useEffect(() => {
    console.log(trades)
  }, [trades])

  const requestDexTrades = (type) => {
    if (!type || !Object.keys(DEX_PROTOCOLS).includes(type)) {
      openNotificationWithIcon('error', 'Something Wrong', 'Unsupported protocol is requested. Please check it again.')
      return;
    }
    const protocol = DEX_PROTOCOLS[type]
    setEphemeral({ ...ephemeral, loading: true })
    getUniSwapTrades(protocol).then(trds => {
      setEphemeral({ ...ephemeral, loading: false })
      setTrades(trds)
    }, error => {
      setEphemeral({ ...ephemeral, loading: false })
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
          <Select defaultValue="US2" size="large" loading={ephemeral.loading} onChange={requestDexTrades}>
            <Option value="US2">UniSwap v2</Option>
            <Option value="US3">UniSwap v3</Option>
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
