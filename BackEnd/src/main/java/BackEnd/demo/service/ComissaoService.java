package BackEnd.demo.service;

import BackEnd.demo.dto.ComissaoVendedorDTO;
import BackEnd.demo.model.Venda;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ComissaoService {

    private final ObjectMapper objectMapper;
    private final List<Venda> vendas = new ArrayList<>();

    @PostConstruct
    public void init() throws Exception {
        carregarVendasDoJson();
    }

    public double calcularComissao(double valor) {
        if (valor < 100.00) {
            return 0.0;
        } else if (valor < 500.00) {
            return valor * 0.01;
        } else {
            return valor * 0.05;
        }
    }

    public void carregarVendasDoJson() throws Exception {
        vendas.clear();
        ClassPathResource resource = new ClassPathResource("vendas.json");

        try (InputStream inputStream = resource.getInputStream()) {
            JsonNode root = objectMapper.readTree(inputStream);
            JsonNode vendasNode = root.get("vendas");

            if (vendasNode != null && vendasNode.isArray()) {
                for (JsonNode node : vendasNode) {
                    String vendedor = node.get("vendedor").asText();
                    double valor = node.get("valor").asDouble();
                    vendas.add(new Venda(vendedor, valor));
                }
            }
        }
    }

    public List<ComissaoVendedorDTO> calcularComissaoPorVendedor() {
        Map<String, ComissaoVendedorDTO> mapa = new LinkedHashMap<>();

        for (Venda venda : vendas) {
            String nome = venda.getVendedor();
            double valorVenda = venda.getValor();
            double comissao = calcularComissao(valorVenda);

            ComissaoVendedorDTO dto = mapa.get(nome);
            if (dto == null) {
                dto = new ComissaoVendedorDTO(nome, 0, 0.0, 0.0);
                mapa.put(nome, dto);
            }

            dto.setTotalVendas(dto.getTotalVendas() + 1);
            dto.setValorTotalVendas(dto.getValorTotalVendas() + valorVenda);
            dto.setValorTotalComissao(dto.getValorTotalComissao() + comissao);
        }

        List<ComissaoVendedorDTO> resultado = new ArrayList<>(mapa.values());
        resultado.sort(Comparator.comparing(ComissaoVendedorDTO::getVendedor));
        return resultado;
    }

    public List<Venda> listarTodasVendas() {
        return vendas;
    }
}
