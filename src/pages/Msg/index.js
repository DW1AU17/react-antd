import React, { Component } from 'react'
import logo from '../../assets/logo.png'
// import withRoute from '../../components/withMouse'

class Logo extends Component {
  render() {
    const { mouse: { x, y } } = this.props
    return (
      <img src={logo} style={{ position: 'absolute', left: x, top: y }} />
    )
  }
}
// 封装一个render prop模式 的高阶组件
class Mouse extends Component {
  state = {
    x: 0,
    y: 0
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    // let {x, y} = this.state
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/* render prop模式 */}
        {/* {this.props.render(this.state)} */}
        {/* children prop模式 */}
        {this.props.children(this.state)}
      </div>
    )
  }
}

// children 是在props里的
// function Header({ children }) {
//   return <div>{children}</div>
// }

function withRoute(Component) {
  return class extends Component {
    render() {
      return (
        <div style={{height: '100%'}}>
          {/* render prop模式  */}
          {/* <Mouse render={mouse => (
            <Component {...this.props} mouse={mouse} />
          )} /> */}
          {/* children prop模式 */}
          <Mouse>
            { mouse => <Component {...this.props} mouse={mouse} /> }
          </Mouse>

        </div>
      )
    }
  }
}


export default withRoute(Logo)

