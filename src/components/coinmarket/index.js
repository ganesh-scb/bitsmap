import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { radioListPairs } from '../coinmarket/pairList.js'
import LinearBuffer from '../coinmarket/linearProgress.js'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    padding: theme.spacing(3, 2),
  },
})

class CoinMarket extends React.Component {
  state = {
    socketData: {},
    selectedPair: 'btcusd'
  }
  componentDidMount() {
    this.initWebsocket()
  }
  initWebsocket = () => {
    const subscribeMsg = {
        event: 'bts:subscribe',
        data: {
            channel: 'live_trades_' + this.state.selectedPair
        }
    };
    // https://www.bitstamp.net/websocket/v2/
    const ws = new WebSocket('wss://ws.bitstamp.net');

    ws.onopen = function () {
        ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = evt => {
        const response = JSON.parse(evt.data);
        /**
         * This switch statement handles message logic. It processes data in case of trade event
         * and it reconnects if the server requires.
         */
        switch (response.event) {
            case 'trade': {
                this.serializeTrade(response.data);
                break;
            }
            case 'bts:request_reconnect': {
                this.initWebsocket();
                break;
            }
            default: {
              this.initWebsocket();
              break;
            }
        }

    };
    /**
     * In case of unexpected close event, try to reconnect.
     */
    ws.onclose = function () {
        console.log('Websocket connection closed');
        this.initWebsocket();
    };
    }
  serializeTrade = data => {
    // const formatted = '(' + data.timestamp + ') ' + data.id + ': ' + data.amount + ' BTC @ ' + data.price + ' USD ' + data.type
    this.setState({
      socketData: {
        timestamp: data.timestamp,
        info: data.amount + ' BTC @ ' + data.price + ' USD ' + data.type
      }
    })
  }
  listCurrencyPairs = () => {
    const pairs = ['btcusd', 'btceur', 'eurusd', 'xrpusd', 'xrpeur', 'xrpbtc', 'ltcusd', 'ltceur', 'ltcbtc', 'ethusd', 'etheur', 'ethbtc', 'bchusd', 'bcheur', 'bchbtc']
    return radioListPairs({
      pairsData: pairs,
      selectedPair: this.state.selectedPair,
      onSelectPair: this.onSelectPair
    })
  }
  onSelectPair = selectedPair => {
    this.setState({
      selectedPair: selectedPair.target.value
    })
    this.initWebsocket()
  }
  render() {
    const { classes } = this.props
    const { socketData } = this.state
    return (
      <div>
        <h1 style={{marginBottom: '50px'}}>Login to Bitsmap live trades</h1>
        {this.listCurrencyPairs()}
        <LinearBuffer />
        <Paper className={classes.root}>
          <div>
            TimeStamp: {socketData.timestamp}
          </div>
          <div>
            {socketData.info}
          </div>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(CoinMarket);
