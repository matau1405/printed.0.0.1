package fr.inti.printed.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.inti.printed.domain.enumeration.Genre;

/**
 * A Client.
 */
@Document(collection = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("nom")
    private String nom;

    @NotNull
    @Field("prenom")
    private String prenom;

    @NotNull
    @Field("genre")
    private Genre genre;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Field("email")
    private String email;

    @NotNull
    @Field("tel")
    private String tel;

    @NotNull
    @Field("addresse_ligne_1")
    private String addresseLigne1;

    @Field("addresse_ligne_2")
    private String addresseLigne2;

    @NotNull
    @Field("ville")
    private String ville;

    @NotNull
    @Field("pays")
    private String pays;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("commande")
    private Set<Facture> commandes = new HashSet<>();

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

    public Client nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Client prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Genre getGenre() {
        return genre;
    }

    public Client genre(Genre genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getEmail() {
        return email;
    }

    public Client email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public Client tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddresseLigne1() {
        return addresseLigne1;
    }

    public Client addresseLigne1(String addresseLigne1) {
        this.addresseLigne1 = addresseLigne1;
        return this;
    }

    public void setAddresseLigne1(String addresseLigne1) {
        this.addresseLigne1 = addresseLigne1;
    }

    public String getAddresseLigne2() {
        return addresseLigne2;
    }

    public Client addresseLigne2(String addresseLigne2) {
        this.addresseLigne2 = addresseLigne2;
        return this;
    }

    public void setAddresseLigne2(String addresseLigne2) {
        this.addresseLigne2 = addresseLigne2;
    }

    public String getVille() {
        return ville;
    }

    public Client ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public Client pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public User getUser() {
        return user;
    }

    public Client user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Facture> getCommandes() {
        return commandes;
    }

    public Client commandes(Set<Facture> factures) {
        this.commandes = factures;
        return this;
    }

    public Client addCommande(Facture facture) {
        this.commandes.add(facture);
        facture.setClient(this);
        return this;
    }

    public Client removeCommande(Facture facture) {
        this.commandes.remove(facture);
        facture.setClient(null);
        return this;
    }

    public void setCommandes(Set<Facture> factures) {
        this.commandes = factures;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", genre='" + getGenre() + "'" +
            ", email='" + getEmail() + "'" +
            ", tel='" + getTel() + "'" +
            ", addresseLigne1='" + getAddresseLigne1() + "'" +
            ", addresseLigne2='" + getAddresseLigne2() + "'" +
            ", ville='" + getVille() + "'" +
            ", pays='" + getPays() + "'" +
            "}";
    }
}
