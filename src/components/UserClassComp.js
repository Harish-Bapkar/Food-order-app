import React from "react";
class UserClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 2,
      userInfo: {
        name: "xyz",
        location: "abc",
      },
    };
    console.log(this.props.id + " Constructor is called ");
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });

    console.log(this.props.id + "Component did mount is called ");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      console.log("component did  update called ");
    }
  }

  componentWillUnmount() {
    console.log("component will mount called ");
  }
  render() {
    console.log(this.props.id + "render si called ");
    const { name, location } = this.state.userInfo;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h2>Name:{name}</h2>
        <h2>Location:{location}</h2>
        <h2>
          {count} and {count2}
        </h2>
        <button
          onClick={() => {
            this.setState({
              count: count + 1,
              count2: count2 + 2,
            });
          }}
        >
          Incrase+
        </button>
      </div>
    );
  }
}

export default UserClassComp;
