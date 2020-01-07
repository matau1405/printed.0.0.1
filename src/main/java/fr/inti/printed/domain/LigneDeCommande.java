package fr.inti.printed.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

import fr.inti.printed.domain.enumeration.StatutArticleComd;

/**
 * A LigneDeCommande.
 */
@Document(collection = "ligne_de_commande")
public class LigneDeCommande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Min(value = 0)
    @Field("quantite")
    private Integer quantite;

    @NotNull
    @DecimalMin(value = "0")
    @Field("ptix_total")
    private BigDecimal ptixTotal;

    @NotNull
    @Field("statut")
    private StatutArticleComd statut;

    @DBRef
    @Field("produit")
    @JsonIgnoreProperties("ligneDeCommandes")
    private Produit produit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public LigneDeCommande quantite(Integer quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPtixTotal() {
        return ptixTotal;
    }

    public LigneDeCommande ptixTotal(BigDecimal ptixTotal) {
        this.ptixTotal = ptixTotal;
        return this;
    }

    public void setPtixTotal(BigDecimal ptixTotal) {
        this.ptixTotal = ptixTotal;
    }

    public StatutArticleComd getStatut() {
        return statut;
    }

    public LigneDeCommande statut(StatutArticleComd statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(StatutArticleComd statut) {
        this.statut = statut;
    }

    public Produit getProduit() {
        return produit;
    }

    public LigneDeCommande produit(Produit produit) {
        this.produit = produit;
        return this;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneDeCommande)) {
            return false;
        }
        return id != null && id.equals(((LigneDeCommande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LigneDeCommande{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", ptixTotal=" + getPtixTotal() +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
