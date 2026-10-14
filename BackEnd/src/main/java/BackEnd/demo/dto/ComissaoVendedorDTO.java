package BackEnd.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComissaoVendedorDTO {

    private String vendedor;
    private Integer totalVendas;
    private Double valorTotalVendas;
    private Double valorTotalComissao;
}
