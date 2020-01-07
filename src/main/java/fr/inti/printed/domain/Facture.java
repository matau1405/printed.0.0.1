package fr.inti.printed.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import fr.inti.printed.domain.enumeration.StatutFacture;

import fr.inti.printed.domain.enumeration.Mode;

/**
 * A Facture.
 */
@Document(collection = "facture")
public class Facture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("code")
    private String code;

    @NotNull
    @Field("date")
    private Instant date;

    @Field("details")
    private String details;

    @NotNull
    @Field("statut")
    private StatutFacture statut;

    @NotNull
    @Field("mode_paiement")
    private Mode modePaiement;

    @NotNull
    @Field("date_paiement")
    private Instant datePaiement;

    @NotNull
    @Field("motant_paiement")
    private BigDecimal motantPaiement;

    @DBRef
    @Field("expedition")
    private Set<Expedition> expeditions = new HashSet<>();

    @DBRef
    @Field("client")
    @JsonIgnoreProperties("commandes")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Facture code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Instant getDate() {
        return date;
    }

    public Facture date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public Facture details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public StatutFacture getStatut() {
        return statut;
    }

    public Facture statut(StatutFacture statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(StatutFacture statut) {
        this.statut = statut;
    }

    public Mode getModePaiement() {
        return modePaiement;
    }

    public Facture modePaiement(Mode modePaiement) {
        this.modePaiement = modePaiement;
        return this;
    }

    public void setModePaiement(Mode modePaiement) {
        this.modePaiement = modePaiement;
    }

    public Instant getDatePaiement() {
        return datePaiement;
    }

    public Facture datePaiement(Instant datePaiement) {
        this.datePaiement = datePaiement;
        return this;
    }

    public void setDatePaiement(Instant datePaiement) {
        this.datePaiement = datePaiement;
    }

    public BigDecimal getMotantPaiement() {
        return motantPaiement;
    }

    public Facture motantPaiement(BigDecimal motantPaiement) {
        this.motantPaiement = motantPaiement;
        return this;
    }

    public void setMotantPaiement(BigDecimal motantPaiement) {
        this.motantPaiement = motantPaiement;
    }

    public Set<Expedition> getExpeditions() {
        return expeditions;
    }

    public Facture expeditions(Set<Expedition> expeditions) {
        this.expeditions = expeditions;
        return this;
    }

    public Facture addExpedition(Expedition expedition) {
        this.expeditions.add(expedition);
        expedition.setFacture(this);
        return this;
    }

    public Facture removeExpedition(Expedition expedition) {
        this.expeditions.remove(expedition);
        expedition.setFacture(null);
        return this;
    }

    public void setExpeditions(Set<Expedition> expeditions) {
        this.expeditions = expeditions;
    }

    public Client getClient() {
        return client;
    }

    public Facture client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facture)) {
            return false;
        }
        return id != null && id.equals(((Facture) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Facture{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            ", statut='" + getStatut() + "'" +
            ", modePaiement='" + getModePaiement() + "'" +
            ", datePaiement='" + getDatePaiement() + "'" +
            ", motantPaiement=" + getMotantPaiement() +
            "}";
    }



  public void setCodeFixe(Client client) {
        this.code = "Commande de : " + client.getNom();
    }

public void setDetailsFixe(ligneDeCommandes[] listLDC){
    String detailsComd = ""
    for(i=0, i<listLDC.size(),i++ ){
        detailsComd = detailsComd + listLDC[i].toString();
    }
        this.details = "Détails de votre commande : " +detailsComd ;

    }
public void setDateFixe (){
this.date = SystemClockFactory.getDatetime()
    }
   public void setMotantPaiement(ligneDeCommandes[] listLDC) {
        this.motantPaiement =  calculPrixPanier(listLDC);
    }

}
