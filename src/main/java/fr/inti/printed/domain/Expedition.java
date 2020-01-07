package fr.inti.printed.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Expedition.
 */
@Document(collection = "expedition")
public class Expedition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("code_suivi")
    private String codeSuivi;

    @NotNull
    @Field("date")
    private Instant date;

    @Field("details")
    private String details;

    @DBRef
    @Field("facture")
    @JsonIgnoreProperties("expeditions")
    private Facture facture;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodeSuivi() {
        return codeSuivi;
    }

    public Expedition codeSuivi(String codeSuivi) {
        this.codeSuivi = codeSuivi;
        return this;
    }

    public void setCodeSuivi(String codeSuivi) {
        this.codeSuivi = codeSuivi;
    }

    public Instant getDate() {
        return date;
    }

    public Expedition date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public Expedition details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Facture getFacture() {
        return facture;
    }

    public Expedition facture(Facture facture) {
        this.facture = facture;
        return this;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expedition)) {
            return false;
        }
        return id != null && id.equals(((Expedition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expedition{" +
            "id=" + getId() +
            ", codeSuivi='" + getCodeSuivi() + "'" +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
