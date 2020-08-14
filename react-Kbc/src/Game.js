import React, { Component } from "react";
import "./index.css";
import data from "./questions.json";
import Header from "./Header";
import Modrate from "./Modrate";
import Result from "./Result";
import cash from "./cashprize.json";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answer: "",
      count: 45,
      cashPrize: cash,
      prize: [1000, 2000, 3000, 5000, 10000],
      arr: ["First", "Second", "Third", "Fourth", "Fifth"],
      score: 0,
      disable: true,
      active: false,
      answer: null,
      option: false,
      state1: false,
      state2: false,
      temp: 0,
      username: props.username,
    };
  }
  componentDidMount() {
    this.getQuestion();
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, 1000);
  }

  // componentWillMount() {
  //   clearImmediate(this.myInterval);
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disable: true,
          active: false,
          questions: data.easy[this.state.currentQuestion].question,
        };
      });
      this.myInterval = setInterval(() => {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }, 1000);
    }
  }

  //to display next question
  nextQuestionHandler = () => {
    if (this.state.currentQuestion === 7) {
      this.setState({
        currentQuestion: this.state.temp + 1,
        count: 45,
      });
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        count: 45,
      });
    }
    // this.state.cashPrize[14 - this.state.currentQuestion].color = "red";

    // console.log(this.state.cashPrize);
  };

  getQuestion = () => {
    this.setState(() => {
      return {
        questions: data.easy[this.state.currentQuestion].question,
        // color: cash[this.state.currentQuestion].color,
      };
    });
  };

  //to check answer
  getValue = (event, sum) => {
    if (event == data.easy[this.state.currentQuestion].answer) {
      const prize = this.state.prize;
      if (this.state.currentQuestion === 7) {
        sum = prize[this.state.temp];
      } else {
        sum = prize[this.state.currentQuestion];
      }
      clearInterval(this.myInterval);
    } else {
      sum = sum + 0;
    }
    this.state.score = sum;
    this.state.answer = event;
    // console.log(this.state.score);
    this.setState({
      disable: false,
      active: true,
    });
    if (this.state.answer === data.easy[this.state.currentQuestion].answer)
      alert(`Your answer is right and you won Rs.${sum}`);
    else {
      this.setState({
        option: true,
      });
    }
  };

  fifty = () => {
    this.setState({
      state1: true,
    });
    alert("You have used your 50-50 lifeline");
  };

  switch = () => {
    this.setState({
      state2: true,
      temp: this.state.currentQuestion,
      currentQuestion: 7,
    });
    alert("You have used your switch lifeline");
  };

  render() {
    const setcount = this.state.count > 0 ? this.state.count : 0;
    return (
      <div>
        {this.state.option === true ? (
          <div>
            You Loose on this Question
            <Result score={this.state.score} username={this.state.username} />
          </div>
        ) : this.state.currentQuestion < 5 ||
          this.state.currentQuestion === 7 ? (
          <div>
            {setcount === 0 ? (
              <div>
                <p>Your Time is up !!</p>
                <p>And you won Rs.{this.state.score}</p>{" "}
              </div>
            ) : (
              <>
                <Header username={this.props.username} />
                <br />
                <br />
                <div className="timer">{setcount}</div>
                {this.state.currentQuestion < data.easy.length && (
                  <>
                    <h3>{this.state.questions}</h3>
                    <div className="options" key={this.state.currentQuestion}>
                      <div className="optionsContainer">
                        <div>
                          {" "}
                          <button
                            value={
                              data.easy[this.state.currentQuestion].options[0]
                                .option
                            }
                            onClick={(e) =>
                              this.getValue(e.target.value, this.state.score)
                            }
                            disabled={this.state.active}
                          >
                            {" "}
                            A.
                            {
                              data.easy[this.state.currentQuestion].options[0]
                                .option
                            }{" "}
                          </button>
                          <button
                            value={
                              data.easy[this.state.currentQuestion].options[1]
                                .option
                            }
                            onClick={(e) =>
                              this.getValue(e.target.value, this.state.score)
                            }
                            disabled={this.state.active}
                          >
                            B.{" "}
                            {
                              data.easy[this.state.currentQuestion].options[1]
                                .option
                            }
                          </button>
                        </div>
                        <div>
                          {" "}
                          <button
                            value={
                              data.easy[this.state.currentQuestion].options[2]
                                .option
                            }
                            onClick={(e) =>
                              this.getValue(e.target.value, this.state.score)
                            }
                            disabled={this.state.active}
                          >
                            {" "}
                            C.
                            {
                              data.easy[this.state.currentQuestion].options[2]
                                .option
                            }
                          </button>
                          <button
                            value={
                              data.easy[this.state.currentQuestion].options[3]
                                .option
                            }
                            onClick={(e) =>
                              this.getValue(e.target.value, this.state.score)
                            }
                            disabled={this.state.active}
                          >
                            {" "}
                            D.{" "}
                            {
                              data.easy[this.state.currentQuestion].options[3]
                                .option
                            }
                          </button>
                        </div>
                      </div>
                      {this.state.currentQuestion === 7 ? (
                        <div className="highlight">
                          <marquee behaviour="scroll" direction="left">
                            {" "}
                            Welcome to KBC Reloaded!! Here we bring the{" "}
                            {this.state.arr[this.state.temp]} question for Rs.
                            {this.state.prize[this.state.temp]}
                          </marquee>
                        </div>
                      ) : (
                        <div className="highlight">
                          <marquee behaviour="scroll" direction="left">
                            {" "}
                            Welcome to KBC Reloaded!! Here we bring the{" "}
                            {this.state.arr[this.state.currentQuestion]}{" "}
                            question for Rs.
                            {this.state.prize[this.state.currentQuestion]}
                          </marquee>
                        </div>
                      )}
                      <div className="lifeline">
                        <button
                          onClick={this.fifty}
                          disabled={this.state.state1}
                        >
                          {" "}
                          50-50
                        </button>
                        <button
                          onClick={this.switch}
                          disabled={this.state.state2}
                        >
                          Switch this Question
                        </button>
                      </div>
                    </div>
                    <hr />
                    <button
                      className="next"
                      onClick={this.nextQuestionHandler}
                      disabled={this.state.disable}
                    >
                      Next
                    </button>
                  </>
                )}
                {/* <Footer cashPrize={this.state.cashPrize} /> */}
                <div className="flex-container">
                  {this.state.cashPrize.map((award) => (
                    <div style={{ backgroundColor: this.state.color }}>
                      {award.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <Modrate
            username={this.state.username}
            state1={this.state.state1}
            state2={this.state.state2}
          />
        )}
      </div>
    );
  }
}
