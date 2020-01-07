package fr.inti.printed.service;

import fr.inti.printed.domain.Expedition;
import fr.inti.printed.repository.ExpeditionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Expedition}.
 */
@Service
public class ExpeditionService {

    private final Logger log = LoggerFactory.getLogger(ExpeditionService.class);

    private final ExpeditionRepository expeditionRepository;

    public ExpeditionService(ExpeditionRepository expeditionRepository) {
        this.expeditionRepository = expeditionRepository;
    }

    /**
     * Save a expedition.
     *
     * @param expedition the entity to save.
     * @return the persisted entity.
     */
    public Expedition save(Expedition expedition) {
        log.debug("Request to save Expedition : {}", expedition);
        return expeditionRepository.save(expedition);
    }

    /**
     * Get all the expeditions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Expedition> findAll(Pageable pageable) {
        log.debug("Request to get all Expeditions");
        return expeditionRepository.findAll(pageable);
    }


    /**
     * Get one expedition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Expedition> findOne(String id) {
        log.debug("Request to get Expedition : {}", id);
        return expeditionRepository.findById(id);
    }

    /**
     * Delete the expedition by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Expedition : {}", id);
        expeditionRepository.deleteById(id);
    }
}
