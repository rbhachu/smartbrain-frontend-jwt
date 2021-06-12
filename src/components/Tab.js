import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClickSubmit = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClickSubmit,
      props: { activeTab, label, id },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <li className={className} onClick={onClickSubmit}>
        {`${id}`}
      </li>
    );
  }
}

export default Tab;