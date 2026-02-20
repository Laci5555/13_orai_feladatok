import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import Adat from "./Adat";
import Diagram from "./Diagram";
import App from "./App";


expect.extend(matchers);

describe("Adat tesztje", ()=>{
    test("Gondol gomb", async ()=>{
        const tomb = [30, 71]
        function setTomb() {}
        render(<Adat tomb={tomb} setTomb={setTomb}/>);
        const user = userEvent.setup();
        const button = screen.getByText('Gondol');
        await user.click(button);
        let szam = screen.getByPlaceholderText("szám").value
        console.log(szam);
        expect(parseInt(szam)>=20 && parseInt(szam)<=99).toBeTruthy()
        cleanup();
    })
    test("Hozzáad gomb", async ()=>{
        const tomb = [30, 71]
        let bela = []
        function setTomb(tomb) {
            bela = tomb
            
        }
        render(<Adat tomb={tomb} setTomb={setTomb}/>);
        const user = userEvent.setup();
        const button = screen.getByText('Hozzáad');
        await user.type(screen.getByPlaceholderText("szám"), "27")
        await user.click(button);
        expect(bela[2] == 27).toBeTruthy()
        cleanup();
    })
    test("Üres gomb", async ()=>{
        const tomb = [30, 71]
        let bela = false
        function setTomb(tomb) {
            bela = true
            
        }
        render(<Adat tomb={tomb} setTomb={setTomb}/>);
        const user = userEvent.setup();
        const button = screen.getByText('Hozzáad');
        await user.clear(screen.getByPlaceholderText("szám"))
        await user.click(button);
        expect(bela!=true).toBeTruthy()
        cleanup();
    })
    test("123 gomb", async ()=>{
        const tomb = [30, 71]
        let bela = []
        function setTomb(tomb) {
            bela = tomb
        }
        render(<Adat tomb={tomb} setTomb={setTomb}/>);
        const user = userEvent.setup();
        const button = screen.getByText('Hozzáad');
        await user.type(screen.getByPlaceholderText("szám"), "123")
        await user.click(button);
        expect(bela[2]==99).toBeTruthy()
        cleanup();
    })
    test("vannak e?", async ()=>{
        const tomb = [30, 71]
        render(<Diagram tomb={tomb}/>);
        const button = screen.getByText('30');
        expect(button).toBeTruthy()
        cleanup();
    })
    test("annyi van e?", async ()=>{
        const tomb = [30, 71]
        render(<Diagram tomb={tomb}/>);
        const div = screen.getByTestId('ittvagyok');
        expect(div.childElementCount==tomb.length).toBeTruthy()
        cleanup();
    })
    test("hozzá lehet e adni?", async ()=>{
        render(<App/>);
        const div = screen.getByTestId('ittvagyok');
        const user = userEvent.setup();
        const button = screen.getByText('Hozzáad');
        await user.type(screen.getByPlaceholderText("szám"), "123")
        await user.click(button);
        expect(div.childElementCount==3).toBeTruthy()
        cleanup();
    })
})