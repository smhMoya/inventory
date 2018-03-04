package com.moya.inventory.repository;

import com.moya.inventory.domain.SteelPipe;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SteelPipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SteelPipeRepository extends JpaRepository<SteelPipe, Long> {

}
