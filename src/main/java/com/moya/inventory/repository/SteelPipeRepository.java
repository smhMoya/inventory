package com.moya.inventory.repository;

import com.moya.inventory.domain.SteelPipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the SteelPipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SteelPipeRepository extends JpaRepository<SteelPipe, Long> {

}
