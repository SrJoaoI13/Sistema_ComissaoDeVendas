package BackEnd.demo.controller;

import BackEnd.demo.dto.ComissaoVendedorDTO;
import BackEnd.demo.model.Venda;
import BackEnd.demo.service.ComissaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/comissoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ComissaoController {

    private final ComissaoService comissaoService;

    @GetMapping
    public ResponseEntity<List<ComissaoVendedorDTO>> listarComissoes() {
        List<ComissaoVendedorDTO> comissoes = comissaoService.calcularComissaoPorVendedor();
        return ResponseEntity.ok(comissoes);
    }

    @GetMapping("/vendas")
    public ResponseEntity<List<Venda>> listarVendas() {
        List<Venda> vendas = comissaoService.listarTodasVendas();
        return ResponseEntity.ok(vendas);
    }
}
