package fr.inti.printed.repository;
import fr.inti.printed.domain.Expedition;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Expedition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpeditionRepository extends MongoRepository<Expedition, String> {

}
