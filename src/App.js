import './App.css';
import NavBarrr from './NavBarrr';
import Bisection from './method/rootofEQ/Bisection';
import { BrowserRouter ,  Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Falsepositions from './method/rootofEQ/Falsepositions';
import Graphical from './method/rootofEQ/Graphical';
import Newton from './method/rootofEQ/Newtonrapson';
import Onepoint from './method/rootofEQ/Onepoint';
import Secant from './method/rootofEQ/Secant';
import Cramer from './method/linea/Cramer';
import Gass from './method/linea/Gass';
import Gjordan from './method/linea/Gjordan';
import Inverse from './method/linea/Inverse';
import Lu from './method/linea/Lu';
import Conjuate from './method/linea/Conjuate';
import NewtonDiv from './method/Interpolation/NewtonDiv';
import Largange from './method/Interpolation/Largange';
import Spline from './method/Interpolation/spline';
import Linear from './method/regression/Linear';
import MultipleLinear from './method/regression/MultipleLinear';
import Polynomial from './method/regression/Polynomial';
const {  Content } = Layout;
function App() {
    console.log(window.location)
 return (
    <div className="App">
        <BrowserRouter>
        <Layout>
        <NavBarrr/>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
                <Routes>
                <Route path="Bisection"  element={<Bisection/>} />
                <Route path='Falsepositions'element={<Falsepositions/>}/>
                <Route path='Graphical'element={<Graphical/>}/>
                <Route path='Newtonrapson'element={<Newton/>}/>
                <Route path='Onepoint'element={<Onepoint/>}/>
                <Route path='Secant'element={<Secant/>}/>
                <Route path='cramer'element={<Cramer/>}/>
                <Route path='gass'element={<Gass/>}/>
                <Route path='Gjordan'element={<Gjordan/>}/>
                <Route path='Inverse'element={<Inverse/>}/>
                <Route path='Lu'element={<Lu/>}/>
                <Route path='Conjuate'element={<Conjuate/>}/>
                <Route path='NewtonDiv'element={<NewtonDiv/>}/>
                <Route path='Largange'element={<Largange/>}/>
                <Route path='Spline'element={<Spline/>}/>
                <Route path='Linear'element={<Linear/>}/>
                <Route path='MultipleLinear'element={<MultipleLinear/>}/>
                <Route path='Polynomial'element={<Polynomial/>}/>

                </Routes>
            </Content>
        </Layout>
        </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
