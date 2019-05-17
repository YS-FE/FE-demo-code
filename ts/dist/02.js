var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function testFn() {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        result = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ok');
            }, 2000);
        });
        return result;
    });
}
function testFn2() {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        result = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ok');
            }, 2000);
        });
        return result;
    });
}
testFn2().then((res) => {
    console.log(res);
});
//# sourceMappingURL=02.js.map