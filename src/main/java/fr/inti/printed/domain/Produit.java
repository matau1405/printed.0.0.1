package fr.inti.printed.domain;
import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

import fr.inti.printed.domain.enumeration.Taille;

/**
 * Product sold by the Online store
 */
@ApiModel(description = "Product sold by the Online store")
@Document(collection = "produit")
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("nom")
    private String nom;

    @Field("description")
    private String description;

    @NotNull
    @DecimalMin(value = "0")
    @Field("prix")
    private BigDecimal prix;

    @NotNull
    @Field("taille")
    private Taille taille;

    @Field("image")
    private byte[] image;

    @Field("image_content_type")
    private String imageContentType;

    @Field("personnalisable")
    private Boolean personnalisable;

    @Field("image_perso")
    private byte[] imagePerso;

    @Field("image_perso_content_type")
    private String imagePersoContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Produit nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public Produit description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public Produit prix(BigDecimal prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Taille getTaille() {
        return taille;
    }

    public Produit taille(Taille taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(Taille taille) {
        this.taille = taille;
    }

    public byte[] getImage() {
        return image;
    }

    public Produit image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Produit imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Boolean isPersonnalisable() {
        return personnalisable;
    }

    public Produit personnalisable(Boolean personnalisable) {
        this.personnalisable = personnalisable;
        return this;
    }

    public void setPersonnalisable(Boolean personnalisable) {
        this.personnalisable = personnalisable;
    }

    public byte[] getImagePerso() {
        return imagePerso;
    }

    public Produit imagePerso(byte[] imagePerso) {
        this.imagePerso = imagePerso;
        return this;
    }

    public void setImagePerso(byte[] imagePerso) {
        this.imagePerso = imagePerso;
    }

    public String getImagePersoContentType() {
        return imagePersoContentType;
    }

    public Produit imagePersoContentType(String imagePersoContentType) {
        this.imagePersoContentType = imagePersoContentType;
        return this;
    }

    public void setImagePersoContentType(String imagePersoContentType) {
        this.imagePersoContentType = imagePersoContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", description='" + getDescription() + "'" +
            ", prix=" + getPrix() +
            ", taille='" + getTaille() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", personnalisable='" + isPersonnalisable() + "'" +
            ", imagePerso='" + getImagePerso() + "'" +
            ", imagePersoContentType='" + getImagePersoContentType() + "'" +
            "}";
    }
}
