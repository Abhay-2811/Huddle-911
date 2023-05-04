import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';
import Consult from './pages/Consult';
import Navbar from './components/Navbar';
import Doc from './pages/Doc';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets,RainbowKitProvider, midnightTheme} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum,filecoinHyperspace, polygonMumbai} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Meet from './pages/Meet';
import Notifications from './pages/Notifications';
import SubmitReport from './pages/SubmitReport';
function App() {
  const { chains, provider } = configureChains([polygonMumbai,polygon],[publicProvider()]);
  const { connectors } = getDefaultWallets({
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })
  return (
    <BrowserRouter>
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme = {midnightTheme({accentColor: 'rgb(11, 83, 238)'})} coolMode>
      <Navbar />
      <Routes>
        <Route exact path='/'element={<Home></Home>}/>
        <Route exact path='/consult'element={<Consult></Consult>}/>
        <Route exact path='/history'element={<History></History>}/>
        <Route exact path='/addDoc' element={<Doc></Doc>}/>
        <Route exact path='/meet' element={<Meet></Meet>}/>
        <Route exact path='/notifications' element={<Notifications></Notifications>}></Route>
        <Route exact path='/submitReport' element={<SubmitReport></SubmitReport>}></Route>
      </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
    </BrowserRouter>
  );
}

export default App;
