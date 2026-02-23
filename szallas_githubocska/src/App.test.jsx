import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import Foglal from "./Foglal";
import { cleanup } from "@testing-library/react";
import Lista from "./Lista";
import App from "./App";


describe("Foglal tesztje", ()=>{
    test("Ár", async ()=>{
        const user = userEvent.setup();
        render(<Foglal />);
        const input = screen.getByLabelText('Éjszakák:');
        await user.clear(input);
        await user.type(input, '5');
        expect(screen.getByText('(Ár: 75000,-Ft)')).toBeTruthy()
        cleanup()
    })
    test("Foglalas", async ()=>{
        const user = userEvent.setup();
        let bela = []
        function setFoglalasok(t){
            bela = t
        }
        render(<Foglal foglalasok={bela} setFoglalasok={setFoglalasok}/>);
        const input = screen.getByLabelText('Éjszakák:');
        await user.clear(input);
        await user.type(input, '5');

        const button = screen.getByTestId('gombocska');
        await user.click(button);
        // console.log("hgéalhgélsgélagéla:"+ bela[0]);
        
        expect(bela[0].ejszaka == 5 && bela[0].reggeli == false).toBeTruthy()
        cleanup()
    })
})

describe("Lista tesztje", ()=>{
    test("Ár", async ()=>{
        let bela = [{ejszaka:5, reggeli:true}]
        render(<Lista foglalasok={bela}/>)
        const szoveg = screen.getByText(/100000,-Ft/i)
        expect(szoveg).toBeTruthy()
        cleanup()
    })
    test("children ", async ()=>{
        let bela = [{ejszaka:5, reggeli:true}, {ejszaka:3, reggeli:true}]
        render(<Lista foglalasok={bela}/>)
        const szulo = screen.getByTestId('szulo')
        expect(szulo.childElementCount).toBe(2)
        cleanup()
    })
})

describe("App tesztje", ()=>{
    test("Lehetséges - e?", async ()=>{
        render(<App/>)
        const input = screen.getByLabelText('Éjszakák:');
        await user.clear(input);
        await user.type(input, '5');

        const check = screen.getByLabelText('reggelivel')
        await user.click(check)
        
        const button = screen.getByTestId('gombocska');
        await user.click(button);

        const szoveg = screen.getByText(/100000,-Ft/i)
        expect(szoveg).toBeTruthy()
    })
})