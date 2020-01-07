package fr.inti.printed.service;

import fr.inti.printed.domain.LigneDeCommande;
import fr.inti.printed.repository.LigneDeCommandeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link LigneDeCommande}.
 */
@Service
public class LigneDeCommandeService {

    private final Logger log = LoggerFactory.getLogger(LigneDeCommandeService.class);

    private final LigneDeCommandeRepository ligneDeCommandeRepository;

    public LigneDeCommandeService(LigneDeCommandeRepository ligneDeCommandeRepository) {
        this.ligneDeCommandeRepository = ligneDeCommandeRepository;
    }

    /**
     * Save a ligneDeCommande.
     *
     * @param ligneDeCommande the entity to save.
     * @return the persisted entity.
     */
    public LigneDeCommande save(LigneDeCommande ligneDeCommande) {
        log.debug("Request to save LigneDeCommande : {}", ligneDeCommande);
        return ligneDeCommandeRepository.save(ligneDeCommande);
    }

    /**
     * Get all the ligneDeCommandes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<LigneDeCommande> findAll(Pageable pageable) {
        log.debug("Request to get all LigneDeCommandes");
        return ligneDeCommandeRepository.findAll(pageable);
    }


    /**
     * Get one ligneDeCommande by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<LigneDeCommande> findOne(String id) {
        log.debug("Request to get LigneDeCommande : {}", id);
        return ligneDeCommandeRepository.findById(id);
    }

    /**
     * Delete the ligneDeCommande by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete LigneDeCommande : {}", id);
        ligneDeCommandeRepository.deleteById(id);
    }
}
