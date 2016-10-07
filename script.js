//model that holds data
var model = {
    sum: 0,
    current: "",
    arr: [0],
    numArray: [
        "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine", "zero"
    ],
    operands: ["plus", "minus", "times", "divide"],
}

//controller to facilitate communication between model and view
var controller = {
    init: function() {
        view.init();
    },
    getNumbers: function() {
        return model.numArray;
    },
    getOperands: function() {
        return model.operands;
    },
    getCurrent: function() {
        return model.current;
    },
    changeCurrent: function(data) {
        model.current += data;
    },
    resetCurrent: function() {
        model.current = "";
    },
    clearClick: function() {
        model.sum = 0;
        model.arr = [0];
        controller.resetCurrent();
    },
    getSum: function() {
        return model.sum;
    },
    getArr: function() {
        return model.arr;
    },
    //this function does the math
    equalClick: function() {
        if (model.current) {
            model.arr.push(parseInt(model.current));
            model.current = "";
            var sum = 0;
            sum += model.arr[1];

            for (var i = 3; i < model.arr.length; i++) {
                if (model.arr[i] != null) {
                    if (model.arr[i - 1] == "+") {
                        sum += model.arr[i];
                    } else if (model.arr[i - 1] == "-") {
                        sum -= model.arr[i];
                    } else if (model.arr[i - 1] == "*") {
                        sum *= model.arr[i];
                    } else if (model.arr[i - 1] == "/") {
                        sum /= model.arr[i];
                    }
                }
            }
            model.sum = sum;
        };
    },
    //this function pushes operands to the model array
    click: function(op) {
        function pushArr(arg) {
            console.log(controller.getArr());
            model.arr.push(parseInt(model.current));
            model.arr.push(arg);
            model.current = "";
            console.log(controller.getArr());
        };
        if (op == "+") {
            pushArr("+");
        } else if (op == "-") {
            pushArr("-");
        } else if (op == "*") {
            pushArr("*");
        } else if (op == "/") {
            pushArr("/");
        };
    },
};

//view
var view = {
    init: function() {

        //variables
        var self = this;
        this.display = document.getElementById('display');
        this.mini = document.getElementById('miniDisplay');
        this.equals = document.getElementById("equals");
        this.clear = document.getElementById("clear");
        this.opFlag = false;
        this.equalFlag = false;

        //create click event for numbers
        controller.getNumbers().forEach(function(item) {

            var elem = document.getElementById(item);
            elem.addEventListener('click', function(item) {
                if (!self.equalFlag) {
                    controller.changeCurrent(this.innerHTML);
                    self.opFlag = true;
                    view.render();
                }
            });
        });

        //create click event for operands
        controller.getOperands().forEach(function(item) {

            var elem = document.getElementById(item);
            elem.addEventListener('click', function() {
                if (self.opFlag) {
                    controller.click(this.innerHTML);
                    self.opFlag = false;
                    self.equalFlag = false;
                    view.render();
                }
            });
        });

        //create click event for equals
        this.equals.addEventListener('click', function() {
            if (controller.getCurrent()) {
                var temp = controller.getArr();
                if (temp.length > 2) {
                    controller.equalClick();
                    view.render();
                    self.equalFlag = true;
                }
            }

        });

        //create click event for clear
        this.clear.addEventListener('click', function() {
            controller.clearClick();
            view.render();
            self.opFlag = false;
            self.equalFlag = false;
            document.getElementById('miniDisplay').innerHTML = "&nbsp;";
        })
    },

    //support function for render returns parsed string
    parseMiniDisplay: function() {
        var algArr = controller.getArr().slice();
        algArr = algArr.splice(1, algArr.length - 1);
        algArr.push(controller.getCurrent());
        var str = algArr.join(" ");
        str = str.replace(/NaN/g, "");
        return str;
    },

    //render view
    render: function() {
        this.display.innerHTML = controller.getSum();
        this.mini.innerHTML = view.parseMiniDisplay();
    }
}

controller.init();