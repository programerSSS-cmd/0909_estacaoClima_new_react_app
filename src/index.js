import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom'
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Carregando from './Carregando'

class App extends React.Component {


    //constructor(props) {
    //super(props)
    //console.log('Construtor')
    //        this.state = {
    //        latitude: null,
    //        longitude: null,
    //        estacao: null,
    //        data: null,
    //        icone: null,
    //       mensagemDeErro: null
    //       }
    //}

    state = {

        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemDeErro: null
    }
    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 22)
        const d3 = new Date(ano, 11, 22)
        const d4 = new Date(ano, 3, 21)
        const sul = latitude < 0

        if (data >= d1 && data < d2) {
            return sul ? 'Inverno' : 'Verao'

        }
        if (data >= d2 && data < d3) {
            return sul ? 'Primavera' : 'Outono'
        }
        if (data >= d3 && data < d4) {
            return sul ? 'Verão' : 'Inverno'
        }
        return sul ? 'Outono' : 'Primavera'
    }

    icones = {
        "Primavera": "fa-seedling", //fa = font awasome
        "Verao": "fa-umbrella-beach",
        "Outono": "fa-tree",
        "Inverno": "fa-snowman"
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                let data = new Date()
                let estacao = this.obterEstacao(data, position.coords.latitude)
                let icone = this.icones[estacao]

                this.setState(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        data: data.toLocaleString(),
                        estacao: estacao,
                        icone: icone
                    }
                )


            },
            (err) => {
                console.log(err)
                this.setState({ mensagemDeErro: 'Tente novamente mais tarde.' })
            }
        )

    }
    componentDidMount() {
        console.log("ComponentDidMount")
        this.obterLocalizacao()
    }
    componentDidUpdate() {
        console.log("ComponentDidUpdate")

    }
    componentWillUnmount() {
        console.log("ComponentWillUnmount")

    }


    render() {
        console.log("render")
        return (
            <div className="container mt-2">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        {
                            (!this.state.mensagemDeErro && !this.state.latitude)
                                ?
                                <Carregando />
                                :

                                this.state.mensagemDeErro ?
                                    <p className="border rounded p-2 fs-1">
                                        É preciso da permissão para acesso à localização
                                    </p>
                                    :
                                    <EstacaoClimatica
                                        icone={this.state.icone}
                                        estacao={this.state.estacao}
                                        longitude={this.state.longitude}
                                        latitude={this.state.latitude}
                                        //data={this.state.data}
                                        //mensagemDeErro={this.state.mensagemDeErro}
                                        obterLocalizacao={this.obterLocalizacao}
                                    />}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)