import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";

class Nav extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => {
        return (
          <div key={category.path}>
            <a className="item" href={"/" + category.name}>
              {category.name}
            </a>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <a className="header item" href={"/"}>
          Home{" "}
        </a>
        {this.renderCategories()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories.all };
}

export default connect(mapStateToProps, { fetchCategories })(Nav);
