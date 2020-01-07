package fr.inti.printed.repository;
import fr.inti.printed.domain.LigneDeCommande;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the LigneDeCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneDeCommandeRepository extends MongoRepository<LigneDeCommande, String> {

}
